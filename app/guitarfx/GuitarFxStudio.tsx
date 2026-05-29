'use client'

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Play, Power, Save, Square } from 'lucide-react'
import { audioEngine } from './audioEngine'
import { BUILT_IN_PRESETS, DEFAULT_PRESET, DEFAULT_PRESET_NAME } from './presets'
import type { DeviceOption, EngineStatus, Preset } from './types'

const PRESET_STORAGE_KEY = 'guitarfx.presets'
const COMPATIBLE_DEFAULT_OUTPUT = 'compatible-default'

interface KnobControlProps {
  label: string
  id: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  valueFormatter: (value: number) => string
}

function getSavedPresets(): Record<string, Preset> {
  try {
    return JSON.parse(localStorage.getItem(PRESET_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function KnobControl({ label, id, min, max, step, value, onChange, valueFormatter }: KnobControlProps) {
  return (
    <div className="gfx-knob-control">
      <div className="gfx-knob-label-row">
        <label htmlFor={id} className="gfx-knob-label">{label}</label>
        <span className="gfx-knob-value">{valueFormatter(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="gfx-slider"
      />
    </div>
  )
}

interface PedalProps {
  title: string
  brand: string
  themeClass: string
  ledColor: 'red' | 'gold' | 'cyan' | 'green' | 'violet'
  isActive: boolean
  onBypassToggle?: () => void
  bypassLabel?: string
  children: ReactNode
}

function Pedal({
  title,
  brand,
  themeClass,
  ledColor,
  isActive,
  onBypassToggle,
  bypassLabel = 'Bypass',
  children,
}: PedalProps) {
  return (
    <article className={`gfx-pedal ${themeClass}`}>
      <div className="gfx-pedal-header">
        <div className="gfx-pedal-title-area">
          <span className="gfx-pedal-brand">{brand}</span>
          <h2>{title}</h2>
        </div>
        <div className={`gfx-led gfx-led-${ledColor} ${isActive ? 'active' : ''}`} />
      </div>

      <div className="gfx-controls-container">
        {children}
      </div>

      <div className="gfx-footswitch-area">
        <button
          type="button"
          className="gfx-footswitch"
          onClick={onBypassToggle}
          aria-label={onBypassToggle ? `${isActive ? 'Bypass' : 'Enable'} ${title}` : title}
          disabled={!onBypassToggle}
        >
          <Power size={16} />
        </button>
        <span className="gfx-footswitch-label">
          {onBypassToggle ? bypassLabel : 'Active'}
        </span>
      </div>
    </article>
  )
}

interface RoutingPanelProps {
  inputs: DeviceOption[]
  outputs: DeviceOption[]
  factoryPresets: string[]
  userPresets: string[]
  selectedInput: string
  selectedOutput: string
  selectedPreset: string
  onInputChange: (id: string) => void
  onOutputChange: (id: string) => void
  onPresetChange: (name: string) => void
  onSavePreset: () => void
}

function RoutingPanel({
  inputs,
  outputs,
  factoryPresets,
  userPresets,
  selectedInput,
  selectedOutput,
  selectedPreset,
  onInputChange,
  onOutputChange,
  onPresetChange,
  onSavePreset,
}: RoutingPanelProps) {
  return (
    <section className="gfx-routing-panel gfx-panel" aria-label="Audio routing">
      <div className="gfx-control-group">
        <label htmlFor="inputSelect" className="gfx-control-label">Guitar Input</label>
        <select
          id="inputSelect"
          className="gfx-select"
          value={selectedInput}
          onChange={(event) => onInputChange(event.target.value)}
        >
          {inputs.length === 0 ? (
            <option value="">Start Audio to list inputs</option>
          ) : (
            inputs.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="gfx-control-group">
        <label htmlFor="outputSelect" className="gfx-control-label">Output Device</label>
        <select
          id="outputSelect"
          className="gfx-select"
          value={selectedOutput}
          onChange={(event) => onOutputChange(event.target.value)}
        >
          <option value={COMPATIBLE_DEFAULT_OUTPUT}>Default output (compatible)</option>
          <option value="">System default (low latency)</option>
          {outputs.length === 0 ? (
            <option value="" disabled>Start Audio to list outputs</option>
          ) : (
            outputs.filter((device) => device.deviceId !== 'default').map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="gfx-control-group">
        <label htmlFor="presetSelect" className="gfx-control-label">Active Preset</label>
        <select
          id="presetSelect"
          className="gfx-select"
          value={selectedPreset}
          onChange={(event) => onPresetChange(event.target.value)}
        >
          <optgroup label="Factory Tones">
            {factoryPresets.map((name) => (
              <option key={`builtin:${name}`} value={`builtin:${name}`}>
                {name}
              </option>
            ))}
          </optgroup>
          {userPresets.length > 0 && (
            <optgroup label="User Tones">
              {userPresets.map((name) => (
                <option key={`saved:${name}`} value={`saved:${name}`}>
                  {name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </div>

      <button id="savePresetButton" className="gfx-btn gfx-btn-secondary" type="button" onClick={onSavePreset}>
        <Save size={16} />
        Save Preset
      </button>
    </section>
  )
}

interface StatusStripProps {
  engineStatus: EngineStatus
  latencyValue: string
  inputMeterRef: RefObject<HTMLDivElement | null>
  outputMeterRef: RefObject<HTMLDivElement | null>
}

function StatusStrip({ engineStatus, latencyValue, inputMeterRef, outputMeterRef }: StatusStripProps) {
  const statusClass = engineStatus.toLowerCase() === 'running'
    ? 'running'
    : engineStatus.toLowerCase() === 'starting'
      ? 'starting'
      : 'stopped'

  return (
    <section className="gfx-status-strip gfx-panel" aria-label="Audio status">
      <div className="gfx-status-item">
        <span className="gfx-control-label">DSP Engine</span>
        <strong id="engineStatus" className={`gfx-status-value ${statusClass}`}>
          {engineStatus}
        </strong>
      </div>

      <div className="gfx-status-item gfx-meter-container">
        <span className="gfx-control-label">Input Level</span>
        <div className="gfx-meter-wrapper">
          <div ref={inputMeterRef} id="inputMeter" className="gfx-meter-fill" />
        </div>
      </div>

      <div className="gfx-status-item gfx-meter-container">
        <span className="gfx-control-label">Output Level</span>
        <div className="gfx-meter-wrapper">
          <div ref={outputMeterRef} id="outputMeter" className="gfx-meter-fill" />
        </div>
      </div>

      <div className="gfx-status-item">
        <span className="gfx-control-label">Roundtrip Latency</span>
        <strong id="latencyValue" className="gfx-status-value">
          {latencyValue}
        </strong>
      </div>
    </section>
  )
}

function NotesPanel() {
  return (
    <section className="gfx-notes-panel gfx-panel" aria-label="Signal notes">
      <div className="gfx-note-card">
        <strong>Latency Notes</strong>
        <ul>
          <li>
            <span>Run 96 kHz native mode</span>
            <p>Changing the OS audio interface sample rate to 96,000 Hz can halve each browser processing block compared with 48 kHz.</p>
          </li>
          <li>
            <span>Use wired monitoring</span>
            <p>Bluetooth monitoring usually adds 150 ms to 300 ms of delay, which is too slow for live instrument monitoring.</p>
          </li>
          <li>
            <span>Use direct monitor when needed</span>
            <p>USB interfaces with Direct Monitor or Input Mix can route the dry guitar input straight to headphones with hardware-level latency.</p>
          </li>
        </ul>
      </div>

      <div className="gfx-note-card">
        <strong>Signal Chain</strong>
        <ul>
          <li>
            <span>1. Noise Gate</span>
            <p>The gate threshold controls when line hiss and hum close after the guitar signal falls away.</p>
          </li>
          <li>
            <span>2. Saturation</span>
            <p>Drive controls clipping intensity, while Character changes asymmetric harmonics for a warmer or sharper response.</p>
          </li>
          <li>
            <span>3. Amp EQ</span>
            <p>Bass, Mid, and Treble are studio biquad filters for quick tone shaping after the drive stage.</p>
          </li>
          <li>
            <span>4. Cabinet And Room</span>
            <p>Low Cut and Air shape cabinet range, while Reverb blends a generated room impulse through the convolver.</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default function GuitarFxStudio() {
  const [engineStatus, setEngineStatus] = useState<EngineStatus>('Stopped')
  const [latencyValue, setLatencyValue] = useState<string>('-- ms')
  const [inputs, setInputs] = useState<DeviceOption[]>([])
  const [outputs, setOutputs] = useState<DeviceOption[]>([])
  const [selectedInput, setSelectedInput] = useState<string>('')
  const [selectedOutput, setSelectedOutput] = useState<string>(COMPATIBLE_DEFAULT_OUTPUT)
  const [selectedPreset, setSelectedPreset] = useState<string>(`builtin:${DEFAULT_PRESET_NAME}`)
  const [userPresets, setUserPresets] = useState<string[]>([])
  const [isBypassed, setIsBypassed] = useState<boolean>(false)
  const [isStarting, setIsStarting] = useState<boolean>(false)
  const [settings, setSettings] = useState<Preset>(DEFAULT_PRESET)

  const inputMeterRef = useRef<HTMLDivElement>(null)
  const outputMeterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    audioEngine.registerCallbacks(setEngineStatus, setLatencyValue)
    setUserPresets(Object.keys(getSavedPresets()))

    const refreshDevices = async () => {
      const devices = await audioEngine.getDevices()
      setInputs(devices.inputs)
      setOutputs(devices.outputs)
    }

    refreshDevices()

    if (navigator.mediaDevices?.addEventListener) {
      navigator.mediaDevices.addEventListener('devicechange', refreshDevices)
    }

    return () => {
      audioEngine.stop()
      if (navigator.mediaDevices?.removeEventListener) {
        navigator.mediaDevices.removeEventListener('devicechange', refreshDevices)
      }
    }
  }, [])

  const loadPresetValues = (presetValue: string) => {
    const [source, name] = presetValue.split(':')
    const saved = getSavedPresets()
    const activePreset = source === 'builtin' ? BUILT_IN_PRESETS[name] : saved[name]

    if (activePreset) {
      setSettings(activePreset)
      audioEngine.applySettings(activePreset, isBypassed)
    }
  }

  const handlePresetChange = (presetValue: string) => {
    setSelectedPreset(presetValue)
    loadPresetValues(presetValue)
  }

  const handleInputChange = async (id: string) => {
    setSelectedInput(id)
    if (engineStatus === 'Running') {
      try {
        await audioEngine.start(id, selectedOutput, settings, isBypassed)
        audioEngine.startMeters(inputMeterRef.current, outputMeterRef.current)
      } catch (error) {
        console.error('Failed to swap inputs:', error)
      }
    }
  }

  const handleOutputChange = async (id: string) => {
    setSelectedOutput(id)
    if (engineStatus === 'Running') {
      await audioEngine.start(selectedInput, id, settings, isBypassed)
      audioEngine.startMeters(inputMeterRef.current, outputMeterRef.current)
    }
  }

  const handleStartAudio = async () => {
    setIsStarting(true)
    try {
      await audioEngine.start(selectedInput, selectedOutput, settings, isBypassed)
      const devices = await audioEngine.getDevices()
      setInputs(devices.inputs)
      setOutputs(devices.outputs)

      if (devices.inputs.length > 0 && !selectedInput) {
        setSelectedInput(devices.inputs[0].deviceId)
      }
      audioEngine.startMeters(inputMeterRef.current, outputMeterRef.current)
    } catch (error) {
      console.error(error)
    } finally {
      setIsStarting(false)
    }
  }

  const handleStopAudio = async () => {
    await audioEngine.stop()
  }

  const handleSavePreset = () => {
    const name = window.prompt('Enter a name for your custom guitar preset:')
    if (!name?.trim()) return

    const trimmedName = name.trim()
    const saved = getSavedPresets()
    saved[trimmedName] = settings
    localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(saved))

    setUserPresets(Object.keys(saved))
    setSelectedPreset(`saved:${trimmedName}`)
  }

  const updateSetting = (key: keyof Preset, value: number) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    audioEngine.applySettings(newSettings, isBypassed)
  }

  const toggleBypass = () => {
    const nextBypass = !isBypassed
    setIsBypassed(nextBypass)
    audioEngine.applySettings(settings, nextBypass)
  }

  const formatDb = (value: number) => {
    const decimals = value % 1 === 0 ? 0 : 1
    return `${value > 0 ? '+' : ''}${value.toFixed(decimals)} dB`
  }
  const formatPercent = (value: number) => `${Math.round(value * 100)}%`
  const formatHz = (value: number) => `${Math.round(value)} Hz`
  const formatGain = (value: number) => value.toFixed(2)

  const isRunning = engineStatus === 'Running'
  const isPedalActive = isRunning && !isBypassed

  return (
    <main className="guitarfx-page">
      <div className="gfx-shell">
        <header className="gfx-topbar gfx-panel">
          <div className="gfx-topbar-title">
            <p className="gfx-eyebrow">GuitarFX Studio</p>
            <h1>Live Guitar Effects</h1>
          </div>
          <div className="gfx-transport">
            {!isRunning ? (
              <button id="startButton" className="gfx-btn gfx-btn-primary" type="button" onClick={handleStartAudio} disabled={isStarting}>
                <Play size={17} />
                {isStarting ? 'Initializing...' : 'Start Audio'}
              </button>
            ) : (
              <button id="stopButton" className="gfx-btn gfx-btn-danger" type="button" onClick={handleStopAudio}>
                <Square size={17} />
                Stop Audio
              </button>
            )}
          </div>
        </header>

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

        <section className="gfx-pedalboard" aria-label="Effect controls">
          <Pedal
            title="Input Stage"
            brand="Studio Gate v1"
            themeClass="gfx-pedal-input"
            ledColor="cyan"
            isActive={isPedalActive}
            onBypassToggle={toggleBypass}
            bypassLabel={isBypassed ? 'Bypassed' : 'Active'}
          >
            <KnobControl label="Input Trim" id="inputGain" min={0} max={1.2} step={0.01} value={settings.inputGain} onChange={(value) => updateSetting('inputGain', value)} valueFormatter={formatGain} />
            <KnobControl label="Noise Gate" id="gateThreshold" min={-80} max={-20} step={1} value={settings.gateThreshold} onChange={(value) => updateSetting('gateThreshold', value)} valueFormatter={(value) => `${Math.round(value)} dB`} />
          </Pedal>

          <Pedal title="Saturation" brand="Silicon Dust" themeClass="gfx-pedal-drive" ledColor="red" isActive={isPedalActive}>
            <KnobControl label="Drive" id="drive" min={0} max={1} step={0.01} value={settings.drive} onChange={(value) => updateSetting('drive', value)} valueFormatter={formatPercent} />
            <KnobControl label="Character" id="character" min={0} max={1} step={0.01} value={settings.character} onChange={(value) => updateSetting('character', value)} valueFormatter={formatPercent} />
          </Pedal>

          <Pedal title="Amp EQ" brand="Three-Band EQ" themeClass="gfx-pedal-eq" ledColor="green" isActive={isPedalActive}>
            <KnobControl label="Bass" id="bass" min={-12} max={12} step={0.5} value={settings.bass} onChange={(value) => updateSetting('bass', value)} valueFormatter={formatDb} />
            <KnobControl label="Mid" id="mid" min={-12} max={12} step={0.5} value={settings.mid} onChange={(value) => updateSetting('mid', value)} valueFormatter={formatDb} />
            <KnobControl label="Treble" id="treble" min={-12} max={12} step={0.5} value={settings.treble} onChange={(value) => updateSetting('treble', value)} valueFormatter={formatDb} />
          </Pedal>

          <Pedal title="Cabinet" brand="Cab Sim Pro" themeClass="gfx-pedal-cabinet" ledColor="gold" isActive={isPedalActive}>
            <KnobControl label="Low Cut" id="lowCut" min={40} max={180} step={1} value={settings.lowCut} onChange={(value) => updateSetting('lowCut', value)} valueFormatter={formatHz} />
            <KnobControl label="Air Room" id="air" min={2500} max={9000} step={100} value={settings.air} onChange={(value) => updateSetting('air', value)} valueFormatter={formatHz} />
          </Pedal>

          <Pedal title="Studio Space" brand="Plate Ambience" themeClass="gfx-pedal-room" ledColor="violet" isActive={isPedalActive}>
            <KnobControl label="Reverb" id="reverb" min={0} max={1} step={0.01} value={settings.reverb} onChange={(value) => updateSetting('reverb', value)} valueFormatter={formatPercent} />
            <KnobControl label="Master Vol" id="master" min={0} max={1.5} step={0.01} value={settings.master} onChange={(value) => updateSetting('master', value)} valueFormatter={formatPercent} />
          </Pedal>
        </section>

        <NotesPanel />
      </div>
    </main>
  )
}
