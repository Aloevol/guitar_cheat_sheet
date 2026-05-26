import type { Preset } from '../types/guitar';

export const BUILT_IN_PRESETS: Record<string, Preset> = {
  "Clean Room": {
    inputGain: 0.95,
    gateThreshold: -62,
    drive: 0.08,
    character: 0.42,
    bass: 1.5,
    mid: 0,
    treble: 2.5,
    lowCut: 78,
    air: 6600,
    reverb: 0.22,
    master: 0.82
  },
  "Crunch Rhythm": {
    inputGain: 1.05,
    gateThreshold: -55,
    drive: 0.38,
    character: 0.55,
    bass: 2,
    mid: 2.5,
    treble: 3,
    lowCut: 86,
    air: 5300,
    reverb: 0.14,
    master: 0.78
  },
  "Lead Delay Space": {
    inputGain: 1.00,
    gateThreshold: -50,
    drive: 0.62,
    character: 0.70,
    bass: 1.0,
    mid: 4.0,
    treble: 4.0,
    lowCut: 92,
    air: 6100,
    reverb: 0.32,
    master: 0.72
  }
};

export const DEFAULT_PRESET_NAME = "Crunch Rhythm";
export const DEFAULT_PRESET = BUILT_IN_PRESETS[DEFAULT_PRESET_NAME];
