class GuitarProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'gateThreshold', defaultValue: -55, minValue: -90, maxValue: 0, automationRate: 'k-rate' },
      { name: 'drive', defaultValue: 0.35, minValue: 0, maxValue: 1, automationRate: 'k-rate' },
      { name: 'character', defaultValue: 0.55, minValue: 0, maxValue: 1, automationRate: 'k-rate' },
      { name: 'bypass', defaultValue: 0, minValue: 0, maxValue: 1, automationRate: 'k-rate' },
    ]
  }

  constructor() {
    super()
    this.envelope = 0
    this.gateGain = 1
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0]
    const output = outputs[0]
    if (!input || input.length === 0) {
      return true
    }

    const gateThreshold = parameters.gateThreshold[0]
    const threshold = Math.pow(10, gateThreshold / 20)
    const drive = parameters.drive[0]
    const character = parameters.character[0]
    const bypass = parameters.bypass[0] >= 0.5
    const pregain = 1 + drive * 22
    const postgain = 0.82 / (1 + drive * 7)
    const asymmetry = (character - 0.5) * 0.24
    const dcOffsetCorrection = Math.tanh(asymmetry)
    const numChannels = output.length
    const numSamples = output[0].length
    const monoSource = input[0] || new Float32Array(numSamples)

    for (let i = 0; i < numSamples; i += 1) {
      const dryMono = monoSource[i]
      const magnitude = Math.abs(dryMono)
      this.envelope += (magnitude - this.envelope) * (magnitude > this.envelope ? 0.05 : 0.002)

      const desiredGate = this.envelope > threshold ? 1 : 0
      this.gateGain += (desiredGate - this.gateGain) * 0.005

      for (let channel = 0; channel < numChannels; channel += 1) {
        const sourceChan = input[Math.min(channel, input.length - 1)]
        const dry = sourceChan ? sourceChan[i] : 0

        if (bypass) {
          output[channel][i] = dry
          continue
        }

        const gated = dry * this.gateGain
        const shaped = (Math.tanh(gated * pregain + asymmetry) - dcOffsetCorrection) * postgain
        output[channel][i] = Math.max(-0.98, Math.min(0.98, shaped))
      }
    }

    return true
  }
}

registerProcessor('guitar-processor', GuitarProcessor)
