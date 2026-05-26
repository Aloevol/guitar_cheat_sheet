# GuitarFX Studio v2.0

An immersive, browser-first live guitar effects pedalboard and processor built with **React**, **TypeScript**, and the **Web Audio API**. It is designed to test analog audio interfaces (e.g., iRig, Behringer) or USB audio interfaces with your computer.

![App screenshot](https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80)

## Features

- 🎸 **Low-Latency DSP Engine**: Built using custom high-performance `AudioWorkletNode` in JavaScript running on a dedicated audio processing thread.
- 🎚️ **Five-Pedal Analog Simulation**:
  - **Input Stage**: Features an input preamp gain controller and a high-performance **Noise Gate** to cut signal hum.
  - **Saturation (Drive)**: Adds warm digital clip saturation, complete with a **Character** tone-shape filter.
  - **Amp EQ**: Three-band studio-grade parametric equalizer (Bass, Mid, Treble) utilizing biquad peak and shelving filters.
  - **Cabinet Simulator**: Emulates a guitar speaker cabinet response with low-cut rumble shielding and high-end room "air" simulators.
  - **Studio Space**: Built using simulated plate convolution reverb impulse response buffers with dry/wet mixing and a master output gain limiter.
- 💾 **Custom User Presets**: Allows players to save custom tones instantly to browser `localStorage` and switch between built-in presets (e.g., *Crunch Rhythm*, *Clean Room*, *Lead Delay Space*) using optgroup selection dropdowns.
- 🎛️ **High-FPS Direct Level Meters**: Employs DOM ref binding to display real-time input and output level meters running directly inside the Web Audio requestAnimationFrame loop for 60fps responsiveness with zero React overhead.
- 📱 **Sleek Aesthetic Design**: Featuring dark mode styling, custom metallic textures, color-coordinated LED status lights, authentic vintage footswitches, and responsive CSS grids.

---

## Technical Stack & Architecture

- **Core**: React 19, Vite 8, TypeScript 6
- **DSP Core**: Web Audio API `AudioContext` and `AudioWorkletNode`
- **Typing Framework**: Strictly compiled under `verbatimModuleSyntax` for efficient type stripping
- **Performance**: Decoupled Audio Engine singleton (`src/services/AudioEngine.ts`) with custom requestAnimationFrame hooks to eliminate React re-render lags for level meters.

---

## Setup & Running

First, ensure you have [pnpm](https://pnpm.io/) installed.

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

> [!IMPORTANT]
> Browser security policies require microphone/input access to run under **localhost** or **HTTPS**. Direct local file opening will not request mic permission.

---

## Troubleshooting & Hardware Guide

1. **Reduce Latency**: Always use **wired headphones** or studio monitors. Bluetooth or wireless headsets introduce 150ms–300ms of lag due to audio compression, making real-time playing impossible.
2. **Mac Headset Setup**: When using an analog iRig (TRRS device), select the headset port as your input source. If your computer does not automatically detect it as a microphone, use a TRRS headset adapter or a USB guitar audio interface.
3. **Microphone Permissions**: If the meters do not react, verify that you have allowed microphone permission for this domain in your browser's address bar.

---

## Future Roadmap

1. 🎵 **Chromatic Tuner**: Real-time autocorrelation frequency detector to tune your guitar.
2. 🔄 **Delay & Chorus**: Time-based stereo delay lines and LFO-modulated delay chorus pedals.
3. 💾 **IR Cabinet Loader**: Custom impulse response WAV file uploader for professional cabinet emulation.
4. 🔴 **Recorder & Looper**: Capture and play back loops directly in the browser.
5. 🖥️ **Desktop Version**: Packaged as a standalone application using Tauri.
