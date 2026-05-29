import type { AudioEngineState, DeviceOption, EngineStatus, Preset } from './types'

class AudioEngineService {
  private state: AudioEngineState = this.createEmptyState()
  private onStatusChangeCallback: ((status: EngineStatus) => void) | null = null
  private onLatencyChangeCallback: ((latency: string) => void) | null = null
  private activeInputMeterElement: HTMLElement | null = null
  private activeOutputMeterElement: HTMLElement | null = null

  public registerCallbacks(
    onStatusChange: (status: EngineStatus) => void,
    onLatencyChange: (latency: string) => void,
  ) {
    this.onStatusChangeCallback = onStatusChange
    this.onLatencyChangeCallback = onLatencyChange
  }

  public async getDevices(): Promise<{ inputs: DeviceOption[]; outputs: DeviceOption[] }> {
    if (!navigator.mediaDevices?.enumerateDevices) {
      return { inputs: [], outputs: [] }
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const inputs = devices
        .filter((device) => device.kind === 'audioinput')
        .map((device, index) => ({
          deviceId: device.deviceId,
          label: device.label || `Audio Input ${index + 1}`,
        }))
      const outputs = devices
        .filter((device) => device.kind === 'audiooutput')
        .map((device, index) => ({
          deviceId: device.deviceId,
          label: device.label || `Default Output ${index + 1}`,
        }))

      return { inputs, outputs }
    } catch (error) {
      console.error('Failed to enumerate devices:', error)
      return { inputs: [], outputs: [] }
    }
  }

  public startMeters(inputMeter: HTMLElement | null, outputMeter: HTMLElement | null) {
    this.activeInputMeterElement = inputMeter
    this.activeOutputMeterElement = outputMeter

    if (this.state.meterFrame) {
      cancelAnimationFrame(this.state.meterFrame)
    }

    const draw = () => {
      if (!this.state.inputAnalyser || !this.state.outputAnalyser) return

      if (this.activeInputMeterElement) {
        const inputLevel = Math.round(this.meterLevel(this.state.inputAnalyser) * 100)
        this.activeInputMeterElement.style.width = `${inputLevel}%`
      }
      if (this.activeOutputMeterElement) {
        const outputLevel = Math.round(this.meterLevel(this.state.outputAnalyser) * 100)
        this.activeOutputMeterElement.style.width = `${outputLevel}%`
      }

      this.state.meterFrame = requestAnimationFrame(draw)
    }

    draw()
  }

  public async setOutputDevice(outputId: string) {
    if (!this.state.monitor) return

    const monitor = this.state.monitor as HTMLAudioElement & {
      setSinkId?: (sinkId: string) => Promise<void>
    }

    if (typeof monitor.setSinkId === 'function') {
      try {
        await monitor.setSinkId(outputId)
      } catch (error) {
        console.error('Failed to set output device sink ID:', error)
        this.setStatus('Output switch failed')
      }
    }
  }

  public async start(
    selectedInputId: string | null,
    selectedOutputId: string | null,
    settings: Preset,
    isBypassed: boolean,
  ) {
    await this.stop()

    const constraints: MediaStreamConstraints = {
      audio: {
        deviceId: selectedInputId ? { exact: selectedInputId } : undefined,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 1,
        latency: 0,
      } as MediaTrackConstraints,
    }

    this.setStatus('Starting')

    try {
      this.state.stream = await navigator.mediaDevices.getUserMedia(constraints)

      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      this.state.audioContext = new AudioContextClass({ latencyHint: 0.01 })
      await this.state.audioContext.audioWorklet.addModule('/guitar-processor.js')

      this.state.source = this.state.audioContext.createMediaStreamSource(this.state.stream)
      this.state.inputGain = this.state.audioContext.createGain()
      this.state.processor = new AudioWorkletNode(this.state.audioContext, 'guitar-processor')
      this.state.bass = new BiquadFilterNode(this.state.audioContext, { type: 'lowshelf', frequency: 160 })
      this.state.mid = new BiquadFilterNode(this.state.audioContext, { type: 'peaking', frequency: 850, Q: 0.8 })
      this.state.treble = new BiquadFilterNode(this.state.audioContext, { type: 'highshelf', frequency: 3200 })
      this.state.lowCut = new BiquadFilterNode(this.state.audioContext, { type: 'highpass', frequency: 82, Q: 0.7 })
      this.state.air = new BiquadFilterNode(this.state.audioContext, { type: 'lowpass', frequency: 5200, Q: 0.8 })

      this.state.effectGain = this.state.audioContext.createGain()
      this.state.bypassGain = this.state.audioContext.createGain()
      this.state.dryGain = this.state.audioContext.createGain()
      this.state.wetGain = this.state.audioContext.createGain()
      this.state.convolver = this.state.audioContext.createConvolver()
      this.state.master = this.state.audioContext.createGain()
      this.state.limiter = new DynamicsCompressorNode(this.state.audioContext, {
        threshold: -6,
        knee: 4,
        ratio: 20,
        attack: 0.002,
        release: 0.12,
      })

      this.state.inputAnalyser = this.state.audioContext.createAnalyser()
      this.state.outputAnalyser = this.state.audioContext.createAnalyser()
      this.state.inputAnalyser.fftSize = 512
      this.state.outputAnalyser.fftSize = 512
      this.state.convolver.buffer = this.makeImpulseResponse(this.state.audioContext)

      this.state.source.connect(this.state.inputGain)
      this.state.inputGain.connect(this.state.inputAnalyser)
      this.state.inputGain
        .connect(this.state.processor)
        .connect(this.state.bass)
        .connect(this.state.mid)
        .connect(this.state.treble)
        .connect(this.state.lowCut)
        .connect(this.state.air)

      this.state.inputGain.connect(this.state.bypassGain).connect(this.state.master)
      this.state.air.connect(this.state.dryGain).connect(this.state.effectGain)
      this.state.air.connect(this.state.convolver).connect(this.state.wetGain).connect(this.state.effectGain)
      this.state.effectGain.connect(this.state.master)
      this.state.master.connect(this.state.limiter).connect(this.state.outputAnalyser)

      const shouldUseCompatibleDefault = selectedOutputId === 'compatible-default'
      const selectedOutputDeviceId = selectedOutputId && selectedOutputId !== 'default' && selectedOutputId !== 'compatible-default'
        ? selectedOutputId
        : null

      if (shouldUseCompatibleDefault || selectedOutputDeviceId) {
        this.state.monitor = new Audio()
        this.state.monitor.autoplay = true
        this.state.mediaDestination = this.state.audioContext.createMediaStreamDestination()
        this.state.outputAnalyser.connect(this.state.mediaDestination)
        this.state.monitor.srcObject = this.state.mediaDestination.stream
        if (selectedOutputDeviceId) {
          await this.setOutputDevice(selectedOutputDeviceId)
        }
        await this.state.monitor.play()
      } else {
        this.state.outputAnalyser.connect(this.state.audioContext.destination)
      }

      this.applySettings(settings, isBypassed)

      const base = this.state.audioContext.baseLatency || 0
      const output = this.state.audioContext.outputLatency || 0
      const totalLatencyMs = (base + output) * 1000
      const rateKhz = Math.round(this.state.audioContext.sampleRate / 100) / 10
      this.setLatency(totalLatencyMs > 0 ? `${totalLatencyMs.toFixed(2)} ms @ ${rateKhz} kHz` : 'Live')
      this.setStatus('Running')

      if (this.activeInputMeterElement || this.activeOutputMeterElement) {
        this.startMeters(this.activeInputMeterElement, this.activeOutputMeterElement)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Audio failed'
      console.error('Audio start failed:', error)
      this.setStatus(message)
      await this.stop()
      throw error
    }
  }

  public async stop() {
    this.stopMeters()

    if (this.state.stream) {
      this.state.stream.getTracks().forEach((track) => track.stop())
    }

    if (this.state.monitor) {
      this.state.monitor.pause()
      this.state.monitor.srcObject = null
    }

    if (this.state.audioContext) {
      try {
        await this.state.audioContext.close()
      } catch (error) {
        console.error('Error closing audio context:', error)
      }
    }

    this.state = this.createEmptyState()
    this.setLatency('-- ms')
    this.setStatus('Stopped')
  }

  public applySettings(settings: Preset, isBypassed: boolean) {
    if (!this.state.audioContext) return

    const now = this.state.audioContext.currentTime

    this.state.inputGain?.gain.setTargetAtTime(settings.inputGain, now, 0.01)
    this.state.processor?.parameters.get('gateThreshold')?.setTargetAtTime(settings.gateThreshold, now, 0.01)
    this.state.processor?.parameters.get('drive')?.setTargetAtTime(settings.drive, now, 0.01)
    this.state.processor?.parameters.get('character')?.setTargetAtTime(settings.character, now, 0.01)
    this.state.processor?.parameters.get('bypass')?.setTargetAtTime(isBypassed ? 1 : 0, now, 0.01)
    this.state.bass?.gain.setTargetAtTime(settings.bass, now, 0.01)
    this.state.mid?.gain.setTargetAtTime(settings.mid, now, 0.01)
    this.state.treble?.gain.setTargetAtTime(settings.treble, now, 0.01)
    this.state.lowCut?.frequency.setTargetAtTime(settings.lowCut, now, 0.01)
    this.state.air?.frequency.setTargetAtTime(settings.air, now, 0.01)
    this.state.dryGain?.gain.setTargetAtTime(1 - settings.reverb * 0.5, now, 0.01)
    this.state.wetGain?.gain.setTargetAtTime(settings.reverb, now, 0.01)
    this.state.effectGain?.gain.setTargetAtTime(isBypassed ? 0 : 1, now, 0.01)
    this.state.bypassGain?.gain.setTargetAtTime(isBypassed ? 1 : 0, now, 0.01)
    this.state.master?.gain.setTargetAtTime(settings.master, now, 0.01)
  }

  private setStatus(message: EngineStatus) {
    this.onStatusChangeCallback?.(message)
  }

  private setLatency(message: string) {
    this.onLatencyChangeCallback?.(message)
  }

  private makeImpulseResponse(audioContext: AudioContext): AudioBuffer {
    const duration = 1.3
    const length = Math.floor(audioContext.sampleRate * duration)
    const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate)

    for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
      const data = impulse.getChannelData(channel)
      for (let i = 0; i < length; i += 1) {
        const decay = Math.pow(1 - i / length, 2.7)
        data[i] = (Math.random() * 2 - 1) * decay * 0.5
      }
    }

    return impulse
  }

  private meterLevel(analyser: AnalyserNode): number {
    const data = new Float32Array(analyser.fftSize)
    analyser.getFloatTimeDomainData(data)
    let sum = 0

    for (let i = 0; i < data.length; i += 1) {
      sum += data[i] * data[i]
    }

    return Math.min(1, Math.sqrt(sum / data.length) * 3.2)
  }

  private stopMeters() {
    if (this.state.meterFrame) {
      cancelAnimationFrame(this.state.meterFrame)
      this.state.meterFrame = null
    }
    if (this.activeInputMeterElement) {
      this.activeInputMeterElement.style.width = '0%'
    }
    if (this.activeOutputMeterElement) {
      this.activeOutputMeterElement.style.width = '0%'
    }
  }

  private createEmptyState(): AudioEngineState {
    return {
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
    }
  }
}

export const audioEngine = new AudioEngineService()
