export interface Preset {
  inputGain: number
  gateThreshold: number
  drive: number
  character: number
  bass: number
  mid: number
  treble: number
  lowCut: number
  air: number
  reverb: number
  master: number
}

export interface DeviceOption {
  deviceId: string
  label: string
}

export type EngineStatus = 'Stopped' | 'Starting' | 'Running' | 'Error' | string

export interface AudioEngineState {
  audioContext: AudioContext | null
  stream: MediaStream | null
  source: MediaStreamAudioSourceNode | null
  inputGain: GainNode | null
  processor: AudioWorkletNode | null
  bass: BiquadFilterNode | null
  mid: BiquadFilterNode | null
  treble: BiquadFilterNode | null
  lowCut: BiquadFilterNode | null
  air: BiquadFilterNode | null
  effectGain: GainNode | null
  bypassGain: GainNode | null
  dryGain: GainNode | null
  wetGain: GainNode | null
  convolver: ConvolverNode | null
  master: GainNode | null
  limiter: DynamicsCompressorNode | null
  inputAnalyser: AnalyserNode | null
  outputAnalyser: AnalyserNode | null
  mediaDestination: MediaStreamAudioDestinationNode | null
  monitor: HTMLAudioElement | null
  meterFrame: number | null
}
