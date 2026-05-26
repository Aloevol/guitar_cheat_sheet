import type { Preset, AudioEngineState, DeviceOption, EngineStatus } from '../types/guitar';

class AudioEngineService {
  private state: AudioEngineState = {
    audioContext: null,
    stream: null,
    source: null,
    inputGain: null,
    processor: null,
    bass: null,
    mid: null,
    treble: null,
    lowCut: null,
    air: null,
    effectGain: null,
    bypassGain: null,
    dryGain: null,
    wetGain: null,
    convolver: null,
    master: null,
    limiter: null,
    inputAnalyser: null,
    outputAnalyser: null,
    mediaDestination: null,
    monitor: null,
    meterFrame: null,
  };

  private onStatusChangeCallback: ((status: EngineStatus) => void) | null = null;
  private onLatencyChangeCallback: ((latency: string) => void) | null = null;
  private activeInputMeterElement: HTMLElement | null = null;
  private activeOutputMeterElement: HTMLElement | null = null;

  public getActiveState(): AudioEngineState {
    return this.state;
  }

  public registerCallbacks(
    onStatusChange: (status: EngineStatus) => void,
    onLatencyChange: (latency: string) => void
  ) {
    this.onStatusChangeCallback = onStatusChange;
    this.onLatencyChangeCallback = onLatencyChange;
  }

  private setStatus(message: EngineStatus) {
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback(message);
    }
  }

  private setLatency(message: string) {
    if (this.onLatencyChangeCallback) {
      this.onLatencyChangeCallback(message);
    }
  }

  public async getDevices(): Promise<{ inputs: DeviceOption[]; outputs: DeviceOption[] }> {
    if (!navigator.mediaDevices?.enumerateDevices) {
      return { inputs: [], outputs: [] };
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const inputs = devices
        .filter((d) => d.kind === 'audioinput')
        .map((d, index) => ({
          deviceId: d.deviceId,
          label: d.label || `Audio Input ${index + 1}`,
        }));
      const outputs = devices
        .filter((d) => d.kind === 'audiooutput')
        .map((d, index) => ({
          deviceId: d.deviceId,
          label: d.label || `Default Output ${index + 1}`,
        }));

      return { inputs, outputs };
    } catch (e) {
      console.error('Failed to enumerate devices:', e);
      return { inputs: [], outputs: [] };
    }
  }

  private makeImpulseResponse(audioContext: AudioContext): AudioBuffer {
    const duration = 1.3;
    const length = Math.floor(audioContext.sampleRate * duration);
    const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate);

    for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i += 1) {
        const decay = Math.pow(1 - i / length, 2.7);
        data[i] = (Math.random() * 2 - 1) * decay * 0.5;
      }
    }

    return impulse;
  }

  private meterLevel(analyser: AnalyserNode): number {
    const data = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i += 1) {
      sum += data[i] * data[i];
    }
    return Math.min(1, Math.sqrt(sum / data.length) * 7);
  }

  public startMeters(inputMeter: HTMLElement | null, outputMeter: HTMLElement | null) {
    this.activeInputMeterElement = inputMeter;
    this.activeOutputMeterElement = outputMeter;

    if (this.state.meterFrame) {
      cancelAnimationFrame(this.state.meterFrame);
    }

    const draw = () => {
      if (!this.state.inputAnalyser || !this.state.outputAnalyser) return;

      if (this.activeInputMeterElement) {
        const inputLvl = Math.round(this.meterLevel(this.state.inputAnalyser) * 100);
        this.activeInputMeterElement.style.width = `${inputLvl}%`;
      }
      if (this.activeOutputMeterElement) {
        const outputLvl = Math.round(this.meterLevel(this.state.outputAnalyser) * 100);
        this.activeOutputMeterElement.style.width = `${outputLvl}%`;
      }

      this.state.meterFrame = requestAnimationFrame(draw);
    };

    draw();
  }

  public stopMeters() {
    if (this.state.meterFrame) {
      cancelAnimationFrame(this.state.meterFrame);
      this.state.meterFrame = null;
    }
    if (this.activeInputMeterElement) {
      this.activeInputMeterElement.style.width = '0%';
    }
    if (this.activeOutputMeterElement) {
      this.activeOutputMeterElement.style.width = '0%';
    }
  }

  public async setOutputDevice(outputId: string) {
    if (!this.state.monitor) return;

    if (typeof (this.state.monitor as any).setSinkId === 'function') {
      try {
        await (this.state.monitor as any).setSinkId(outputId);
      } catch (e) {
        console.error('Failed to set output device sink ID:', e);
        this.setStatus('Output switch failed');
      }
    }
  }

  public async start(
    selectedInputId: string | null,
    selectedOutputId: string | null,
    settings: Preset,
    isBypassed: boolean
  ) {
    await this.stop();

    const constraints: MediaStreamConstraints = {
      audio: {
        deviceId: selectedInputId ? { exact: selectedInputId } : undefined,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 1,
        latency: 0,
      } as any,
    };

    this.setStatus('Starting');

    try {
      this.state.stream = await navigator.mediaDevices.getUserMedia(constraints);

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.state.audioContext = new AudioContextClass({ latencyHint: 0 });
      
      // Load the processor from static /guitar-processor.js in public folder
      await this.state.audioContext.audioWorklet.addModule('/guitar-processor.js');

      this.state.source = this.state.audioContext.createMediaStreamSource(this.state.stream);
      this.state.inputGain = this.state.audioContext.createGain();
      this.state.processor = new AudioWorkletNode(this.state.audioContext, 'guitar-processor');
      this.state.bass = new BiquadFilterNode(this.state.audioContext, { type: 'lowshelf', frequency: 160 });
      this.state.mid = new BiquadFilterNode(this.state.audioContext, { type: 'peaking', frequency: 850, Q: 0.8 });
      this.state.treble = new BiquadFilterNode(this.state.audioContext, { type: 'highshelf', frequency: 3200 });
      this.state.lowCut = new BiquadFilterNode(this.state.audioContext, { type: 'highpass', frequency: 82, Q: 0.7 });
      this.state.air = new BiquadFilterNode(this.state.audioContext, { type: 'lowpass', frequency: 5200, Q: 0.8 });
      
      this.state.effectGain = this.state.audioContext.createGain();
      this.state.bypassGain = this.state.audioContext.createGain();
      this.state.effectGain.gain.value = 1;
      this.state.bypassGain.gain.value = 0;
      
      this.state.dryGain = this.state.audioContext.createGain();
      this.state.wetGain = this.state.audioContext.createGain();
      this.state.convolver = this.state.audioContext.createConvolver();
      this.state.master = this.state.audioContext.createGain();
      
      this.state.limiter = new DynamicsCompressorNode(this.state.audioContext, {
        threshold: -2,
        knee: 0,
        ratio: 18,
        attack: 0.003,
        release: 0.08,
      });

      this.state.inputAnalyser = this.state.audioContext.createAnalyser();
      this.state.outputAnalyser = this.state.audioContext.createAnalyser();
      this.state.inputAnalyser.fftSize = 512;
      this.state.outputAnalyser.fftSize = 512;
      this.state.convolver.buffer = this.makeImpulseResponse(this.state.audioContext);

      // Routing
      this.state.source.connect(this.state.inputAnalyser);
      this.state.source
        .connect(this.state.inputGain)
        .connect(this.state.processor)
        .connect(this.state.bass)
        .connect(this.state.mid)
        .connect(this.state.treble)
        .connect(this.state.lowCut)
        .connect(this.state.air);

      // Bypass routing
      this.state.source.connect(this.state.bypassGain).connect(this.state.master);
      
      // Main effects routing
      this.state.air.connect(this.state.dryGain).connect(this.state.effectGain);
      this.state.air.connect(this.state.convolver).connect(this.state.wetGain).connect(this.state.effectGain);
      
      this.state.effectGain.connect(this.state.master);
      this.state.master.connect(this.state.limiter).connect(this.state.outputAnalyser);

      // Setup output destination
      this.state.monitor = new Audio();
      this.state.monitor.autoplay = true;

      if (typeof (this.state.monitor as any).setSinkId === 'function') {
        this.state.mediaDestination = this.state.audioContext.createMediaStreamDestination();
        this.state.outputAnalyser.connect(this.state.mediaDestination);
        this.state.monitor.srcObject = this.state.mediaDestination.stream;
        if (selectedOutputId) {
          await this.setOutputDevice(selectedOutputId);
        }
        await this.state.monitor.play();
      } else {
        this.state.outputAnalyser.connect(this.state.audioContext.destination);
      }

      this.applySettings(settings, isBypassed);

      const base = this.state.audioContext.baseLatency || 0;
      const output = (this.state.audioContext as any).outputLatency || 0;
      const totalLatencyMs = (base + output) * 1000;
      const rateKhz = Math.round(this.state.audioContext.sampleRate / 100) / 10;
      this.setLatency(totalLatencyMs > 0 ? `${totalLatencyMs.toFixed(2)} ms @ ${rateKhz} kHz` : 'Live');
      this.setStatus('Running');

      // Start drawing level meters
      if (this.activeInputMeterElement || this.activeOutputMeterElement) {
        this.startMeters(this.activeInputMeterElement, this.activeOutputMeterElement);
      }
    } catch (e: any) {
      console.error('Audio start failed:', e);
      this.setStatus(e.message || 'Audio failed');
      await this.stop();
      throw e;
    }
  }

  public async stop() {
    this.stopMeters();

    if (this.state.stream) {
      this.state.stream.getTracks().forEach((track) => track.stop());
    }

    if (this.state.monitor) {
      this.state.monitor.pause();
      this.state.monitor.srcObject = null;
    }

    if (this.state.audioContext) {
      try {
        await this.state.audioContext.close();
      } catch (e) {
        console.error('Error closing audio context:', e);
      }
    }

    // Reset all state keys to null
    this.state = {
      audioContext: null,
      stream: null,
      source: null,
      inputGain: null,
      processor: null,
      bass: null,
      mid: null,
      treble: null,
      lowCut: null,
      air: null,
      effectGain: null,
      bypassGain: null,
      dryGain: null,
      wetGain: null,
      convolver: null,
      master: null,
      limiter: null,
      inputAnalyser: null,
      outputAnalyser: null,
      mediaDestination: null,
      monitor: null,
      meterFrame: null,
    };

    this.setLatency('-- ms');
    this.setStatus('Stopped');
  }

  public applySettings(settings: Preset, isBypassed: boolean) {
    if (!this.state.audioContext) return;

    const now = this.state.audioContext.currentTime;

    // Apply values to AudioNodes with gentle schedules to avoid clicks
    if (this.state.inputGain) {
      this.state.inputGain.gain.setTargetAtTime(settings.inputGain, now, 0.01);
    }
    
    if (this.state.processor) {
      const gateParam = this.state.processor.parameters.get('gateThreshold');
      const driveParam = this.state.processor.parameters.get('drive');
      const charParam = this.state.processor.parameters.get('character');
      const bypassParam = this.state.processor.parameters.get('bypass');

      if (gateParam) gateParam.setTargetAtTime(settings.gateThreshold, now, 0.01);
      if (driveParam) driveParam.setTargetAtTime(settings.drive, now, 0.01);
      if (charParam) charParam.setTargetAtTime(settings.character, now, 0.01);
      if (bypassParam) bypassParam.setTargetAtTime(isBypassed ? 1 : 0, now, 0.01);
    }

    if (this.state.bass) {
      this.state.bass.gain.setTargetAtTime(settings.bass, now, 0.01);
    }
    if (this.state.mid) {
      this.state.mid.gain.setTargetAtTime(settings.mid, now, 0.01);
    }
    if (this.state.treble) {
      this.state.treble.gain.setTargetAtTime(settings.treble, now, 0.01);
    }
    if (this.state.lowCut) {
      this.state.lowCut.frequency.setTargetAtTime(settings.lowCut, now, 0.01);
    }
    if (this.state.air) {
      this.state.air.frequency.setTargetAtTime(settings.air, now, 0.01);
    }

    if (this.state.dryGain) {
      this.state.dryGain.gain.setTargetAtTime(1 - settings.reverb * 0.5, now, 0.01);
    }
    if (this.state.wetGain) {
      this.state.wetGain.gain.setTargetAtTime(settings.reverb, now, 0.01);
    }

    if (this.state.effectGain) {
      this.state.effectGain.gain.setTargetAtTime(isBypassed ? 0 : 1, now, 0.01);
    }
    if (this.state.bypassGain) {
      this.state.bypassGain.gain.setTargetAtTime(isBypassed ? 1 : 0, now, 0.01);
    }

    if (this.state.master) {
      this.state.master.gain.setTargetAtTime(settings.master, now, 0.01);
    }
  }
}

export const audioEngine = new AudioEngineService();
