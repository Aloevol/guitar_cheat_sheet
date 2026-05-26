import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { RoutingPanel } from './components/RoutingPanel';
import { StatusStrip } from './components/StatusStrip';
import { Pedal } from './components/Pedal';
import { KnobControl } from './components/KnobControl';
import { NotesPanel } from './components/NotesPanel';
import type { Preset, DeviceOption, EngineStatus } from './types/guitar';
import { BUILT_IN_PRESETS, DEFAULT_PRESET, DEFAULT_PRESET_NAME } from './constants/presets';
import { audioEngine } from './services/AudioEngine';

function App() {
  const [engineStatus, setEngineStatus] = useState<EngineStatus>('Stopped');
  const [latencyValue, setLatencyValue] = useState<string>('-- ms');
  const [inputs, setInputs] = useState<DeviceOption[]>([]);
  const [outputs, setOutputs] = useState<DeviceOption[]>([]);
  const [selectedInput, setSelectedInput] = useState<string>('');
  const [selectedOutput, setSelectedOutput] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<string>(`builtin:${DEFAULT_PRESET_NAME}`);
  const [userPresets, setUserPresets] = useState<string[]>([]);
  const [isBypassed, setIsBypassed] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [settings, setSettings] = useState<Preset>(DEFAULT_PRESET);

  const inputMeterRef = useRef<HTMLDivElement | null>(null);
  const outputMeterRef = useRef<HTMLDivElement | null>(null);

  // Load custom presets list from LocalStorage helper
  const getSavedPresets = (): Record<string, Preset> => {
    try {
      return JSON.parse(localStorage.getItem("guitarfx.presets") || "{}");
    } catch {
      return {};
    }
  };

  useEffect(() => {
    // Register audio engine status/latency callback
    audioEngine.registerCallbacks(
      (status) => setEngineStatus(status),
      (latency) => setLatencyValue(latency)
    );

    // Initial load of custom presets
    const saved = getSavedPresets();
    setUserPresets(Object.keys(saved));

    // Try to get audio devices lists right away
    const fetchInitialDevices = async () => {
      const devices = await audioEngine.getDevices();
      setInputs(devices.inputs);
      setOutputs(devices.outputs);
    };
    fetchInitialDevices();

    // Listen for device change events (plugging in interfaces/headphones)
    const handleDeviceChange = async () => {
      const devices = await audioEngine.getDevices();
      setInputs(devices.inputs);
      setOutputs(devices.outputs);
    };

    if (navigator.mediaDevices?.addEventListener) {
      navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
    }

    return () => {
      // Safe cleanup on unmount
      audioEngine.stop();
      if (navigator.mediaDevices?.removeEventListener) {
        navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
      }
    };
  }, []);

  // Update preset settings
  const loadPresetValues = (presetValue: string) => {
    const [source, name] = presetValue.split(":");
    const saved = getSavedPresets();
    const activePreset = source === "builtin" ? BUILT_IN_PRESETS[name] : saved[name];
    
    if (activePreset) {
      setSettings(activePreset);
      // Hot-apply settings to engine if running
      audioEngine.applySettings(activePreset, isBypassed);
    }
  };

  const handlePresetChange = (presetValue: string) => {
    setSelectedPreset(presetValue);
    loadPresetValues(presetValue);
  };

  const handleInputChange = async (id: string) => {
    setSelectedInput(id);
    // Restart audio stream using new input device if currently running
    if (engineStatus === 'Running') {
      try {
        await audioEngine.start(id, selectedOutput, settings, isBypassed);
        audioEngine.startMeters(inputMeterRef.current, outputMeterRef.current);
      } catch (err) {
        console.error('Failed to swap inputs:', err);
      }
    }
  };

  const handleOutputChange = async (id: string) => {
    setSelectedOutput(id);
    if (engineStatus === 'Running') {
      await audioEngine.setOutputDevice(id);
    }
  };

  const handleStartAudio = async () => {
    setIsStarting(true);
    try {
      await audioEngine.start(selectedInput, selectedOutput, settings, isBypassed);
      // Fetch devices to see labels now that microphone permission is granted
      const devices = await audioEngine.getDevices();
      setInputs(devices.inputs);
      setOutputs(devices.outputs);

      // Pre-select first devices if none is selected
      if (devices.inputs.length > 0 && !selectedInput) {
        setSelectedInput(devices.inputs[0].deviceId);
      }
      if (devices.outputs.length > 0 && !selectedOutput) {
        setSelectedOutput(devices.outputs[0].deviceId);
      }

      // Start the direct level meters
      audioEngine.startMeters(inputMeterRef.current, outputMeterRef.current);
    } catch (err) {
      console.error(err);
    } finally {
      setIsStarting(false);
    }
  };

  const handleStopAudio = async () => {
    await audioEngine.stop();
  };

  const handleSavePreset = () => {
    const name = window.prompt("Enter a name for your custom guitar preset:");
    if (!name || !name.trim()) return;

    const trimmedName = name.trim();
    const saved = getSavedPresets();
    saved[trimmedName] = settings;
    localStorage.setItem("guitarfx.presets", JSON.stringify(saved));
    
    // Refresh user presets select dropdown
    setUserPresets(Object.keys(saved));
    const newPresetKey = `saved:${trimmedName}`;
    setSelectedPreset(newPresetKey);
  };

  // Adjust pedal value and apply live to AudioEngine
  const updateSetting = (key: keyof Preset, value: number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    audioEngine.applySettings(newSettings, isBypassed);
  };

  const toggleBypass = () => {
    const nextBypass = !isBypassed;
    setIsBypassed(nextBypass);
    audioEngine.applySettings(settings, nextBypass);
  };

  // Formatters for Knob Controls
  const formatDb = (value: number) => {
    const decimals = value % 1 === 0 ? 0 : 1;
    return `${value > 0 ? "+" : ""}${value.toFixed(decimals)} dB`;
  };

  const formatPercent = (value: number) => `${Math.round(value * 100)}%`;
  const formatHz = (value: number) => `${Math.round(value)} Hz`;
  const formatGain = (value: number) => value.toFixed(2);

  return (
    <main className="app-shell">
      <Header 
        isEngineRunning={engineStatus === 'Running'} 
        isStarting={isStarting}
        onStart={handleStartAudio} 
        onStop={handleStopAudio} 
      />

      <RoutingPanel
        inputs={inputs}
        outputs={outputs}
        factoryPresets={Object.keys(BUILT_IN_PRESETS)}
        userPresets={userPresets}
        selectedInput={selectedInput}
        selectedOutput={selectedOutput}
        selectedPreset={selectedPreset}
        onInputChange={handleInputChange}
        onOutputChange={handleOutputChange}
        onPresetChange={handlePresetChange}
        onSavePreset={handleSavePreset}
      />

      <StatusStrip
        engineStatus={engineStatus}
        latencyValue={latencyValue}
        inputMeterRef={inputMeterRef}
        outputMeterRef={outputMeterRef}
      />

      <section className="pedalboard" aria-label="Effect controls">
        {/* Input & Gate Pedal */}
        <Pedal 
          title="Input Stage" 
          brand="Studio Gate v1" 
          themeClass="pedal-input" 
          ledColor="cyan"
          isActive={engineStatus === 'Running' && !isBypassed}
          onBypassToggle={toggleBypass}
          bypassLabel={isBypassed ? "Bypassed" : "Active"}
        >
          <KnobControl 
            label="Gain" 
            id="inputGain" 
            min={0} 
            max={2} 
            step={0.01} 
            value={settings.inputGain} 
            onChange={(val) => updateSetting('inputGain', val)}
            valueFormatter={formatGain}
          />
          <KnobControl 
            label="Noise Gate" 
            id="gateThreshold" 
            min={-80} 
            max={-20} 
            step={1} 
            value={settings.gateThreshold} 
            onChange={(val) => updateSetting('gateThreshold', val)}
            valueFormatter={(val) => `${Math.round(val)} dB`}
          />
        </Pedal>

        {/* Drive Pedal */}
        <Pedal 
          title="Saturation" 
          brand="Silicon Dust" 
          themeClass="pedal-drive" 
          ledColor="red"
          isActive={engineStatus === 'Running' && !isBypassed}
        >
          <KnobControl 
            label="Drive" 
            id="drive" 
            min={0} 
            max={1} 
            step={0.01} 
            value={settings.drive} 
            onChange={(val) => updateSetting('drive', val)}
            valueFormatter={formatPercent}
          />
          <KnobControl 
            label="Character" 
            id="character" 
            min={0} 
            max={1} 
            step={0.01} 
            value={settings.character} 
            onChange={(val) => updateSetting('character', val)}
            valueFormatter={formatPercent}
          />
        </Pedal>

        {/* EQ Pedal */}
        <Pedal 
          title="Amp EQ" 
          brand="Three-Band EQ" 
          themeClass="pedal-eq" 
          ledColor="green"
          isActive={engineStatus === 'Running' && !isBypassed}
        >
          <KnobControl 
            label="Bass" 
            id="bass" 
            min={-12} 
            max={12} 
            step={0.5} 
            value={settings.bass} 
            onChange={(val) => updateSetting('bass', val)}
            valueFormatter={formatDb}
          />
          <KnobControl 
            label="Mid" 
            id="mid" 
            min={-12} 
            max={12} 
            step={0.5} 
            value={settings.mid} 
            onChange={(val) => updateSetting('mid', val)}
            valueFormatter={formatDb}
          />
          <KnobControl 
            label="Treble" 
            id="treble" 
            min={-12} 
            max={12} 
            step={0.5} 
            value={settings.treble} 
            onChange={(val) => updateSetting('treble', val)}
            valueFormatter={formatDb}
          />
        </Pedal>

        {/* Cabinet emulation */}
        <Pedal 
          title="Cabinet" 
          brand="Cab Sim Pro" 
          themeClass="pedal-cabinet" 
          ledColor="gold"
          isActive={engineStatus === 'Running' && !isBypassed}
        >
          <KnobControl 
            label="Low Cut" 
            id="lowCut" 
            min={40} 
            max={180} 
            step={1} 
            value={settings.lowCut} 
            onChange={(val) => updateSetting('lowCut', val)}
            valueFormatter={formatHz}
          />
          <KnobControl 
            label="Air Room" 
            id="air" 
            min={2500} 
            max={9000} 
            step={100} 
            value={settings.air} 
            onChange={(val) => updateSetting('air', val)}
            valueFormatter={formatHz}
          />
        </Pedal>

        {/* Reverb Room & Master */}
        <Pedal 
          title="Studio Space" 
          brand="Plate Ambience" 
          themeClass="pedal-room" 
          ledColor="violet"
          isActive={engineStatus === 'Running' && !isBypassed}
        >
          <KnobControl 
            label="Reverb" 
            id="reverb" 
            min={0} 
            max={1} 
            step={0.01} 
            value={settings.reverb} 
            onChange={(val) => updateSetting('reverb', val)}
            valueFormatter={formatPercent}
          />
          <KnobControl 
            label="Master Vol" 
            id="master" 
            min={0} 
            max={1.5} 
            step={0.01} 
            value={settings.master} 
            onChange={(val) => updateSetting('master', val)}
            valueFormatter={formatPercent}
          />
        </Pedal>
      </section>

      <NotesPanel />
    </main>
  );
}

export default App;
