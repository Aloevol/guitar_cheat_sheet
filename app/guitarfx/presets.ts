import type { Preset } from './types'

export const BUILT_IN_PRESETS: Record<string, Preset> = {
  'Direct Clean': {
    inputGain: 0.34,
    gateThreshold: -76,
    drive: 0,
    character: 0.5,
    bass: 0,
    mid: 0,
    treble: 1,
    lowCut: 72,
    air: 7600,
    reverb: 0,
    master: 0.58,
  },
  'Clean Room': {
    inputGain: 0.48,
    gateThreshold: -62,
    drive: 0.08,
    character: 0.42,
    bass: 1.5,
    mid: 0,
    treble: 2.5,
    lowCut: 78,
    air: 6600,
    reverb: 0.22,
    master: 0.68,
  },
  'Crunch Rhythm': {
    inputGain: 0.36,
    gateThreshold: -55,
    drive: 0.3,
    character: 0.55,
    bass: 2,
    mid: 2.5,
    treble: 3,
    lowCut: 86,
    air: 5300,
    reverb: 0.14,
    master: 0.62,
  },
  'Lead Delay Space': {
    inputGain: 0.32,
    gateThreshold: -50,
    drive: 0.5,
    character: 0.7,
    bass: 1,
    mid: 4,
    treble: 4,
    lowCut: 92,
    air: 6100,
    reverb: 0.32,
    master: 0.58,
  },
}

export const DEFAULT_PRESET_NAME = 'Direct Clean'
export const DEFAULT_PRESET = BUILT_IN_PRESETS[DEFAULT_PRESET_NAME]
