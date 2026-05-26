class GuitarProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: "gateThreshold", defaultValue: -55, minValue: -90, maxValue: 0, automationRate: "k-rate" },
      { name: "drive", defaultValue: 0.35, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "character", defaultValue: 0.55, minValue: 0, maxValue: 1, automationRate: "k-rate" },
      { name: "bypass", defaultValue: 0, minValue: 0, maxValue: 1, automationRate: "k-rate" }
    ];
  }

  constructor() {
    super();
    this.envelope = 0;
    this.gateGain = 1;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    if (!input || input.length === 0) {
      return true;
    }

    const gateThreshold = parameters.gateThreshold[0];
    const threshold = Math.pow(10, gateThreshold / 20);
    const drive = parameters.drive[0];
    const character = parameters.character[0];
    const bypass = parameters.bypass[0] >= 0.5;
    const pregain = 1 + drive * 34;
    const postgain = 1 / (1 + drive * 9);
    
    // Asymmetric clipping parameters
    const asymmetry = (character - 0.5) * 0.24;
    // Calculate the DC offset introduced by asymmetric tanh at rest, so we can subtract it
    const dcOffsetCorrection = Math.tanh(asymmetry);

    const numChannels = output.length;
    const numSamples = output[0].length;

    // Use channel 0 (mono input) to compute the envelope and gate gain for this block
    const monoSource = input[0] || new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i += 1) {
      const dryMono = monoSource[i];
      const magnitude = Math.abs(dryMono);
      
      // Update envelope follower: attack (0.05) is fast, release (0.002) is smooth
      this.envelope += (magnitude - this.envelope) * (magnitude > this.envelope ? 0.05 : 0.002);

      // Noise gate comparator: true silent gate (0.0 when closed instead of 0.08)
      const desiredGate = this.envelope > threshold ? 1 : 0.0;
      this.gateGain += (desiredGate - this.gateGain) * 0.005;

      // Apply processing to all output channels for this sample
      for (let channel = 0; channel < numChannels; channel += 1) {
        const sourceChan = input[Math.min(channel, input.length - 1)];
        const dry = sourceChan ? sourceChan[i] : 0;

        if (bypass) {
          output[channel][i] = dry;
          continue;
        }

        const gated = dry * this.gateGain;
        // Asymmetric clipping with DC offset correction to prevent pops and hum
        const shaped = (Math.tanh(gated * pregain + asymmetry) - dcOffsetCorrection) * postgain;
        output[channel][i] = shaped;
      }
    }

    return true;
  }
}

registerProcessor("guitar-processor", GuitarProcessor);
