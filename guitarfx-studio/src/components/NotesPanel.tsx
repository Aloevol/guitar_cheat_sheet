import React from 'react';

export const NotesPanel: React.FC = () => {
  return (
    <section className="notes-panel panel-base" aria-label="Optimization and Pedalboard Help Guide">
      {/* COLUMN 1: LATENCY OPTIMIZER */}
      <div className="note-card">
        <strong>⚡ Latency & Audio Optimizer</strong>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <span style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
              🚀 RUN IN 96 KHZ NATIVE MODE
            </span>
            <p style={{ margin: 0 }}>
              The browser's block processing engine takes 2.67ms per block at 48kHz. If you change your OS system sound settings (macOS Audio MIDI Setup or Windows Sound Control Panel) to **96,000 Hz (96 kHz)**, the block duration is cut in half, dropping your latency down to an astonishing **2.6ms**!
            </p>
          </li>
          <li>
            <span style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
              🚫 BAN WIRELESS / BLUETOOTH
            </span>
            <p style={{ margin: 0 }}>
              Always use **wired headphones or speakers**. Bluetooth headsets introduce an unavoidable hardware compression lag of **150ms to 300ms**, which makes real-time instrument monitoring completely impossible.
            </p>
          </li>
          <li>
            <span style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
              🎙️ ZERO-LATENCY DIRECT MONITOR
            </span>
            <p style={{ margin: 0 }}>
              Most USB interfaces (like Focusrite, iRig, or Behringer) feature a physical **Direct Monitor** or **Input Mix** switch. Enabling this routes the analog guitar input straight to your headphones with **0.00ms physical delay** (dry bypass).
            </p>
          </li>
        </ul>
      </div>

      {/* COLUMN 2: PEDAL CHAIN GUIDE */}
      <div className="note-card">
        <strong>🎸 Pedal Signal Chain Reference</strong>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>
            <span style={{ color: 'var(--color-red)', fontWeight: 'bold', fontSize: '0.85rem', display: 'block', marginBottom: '2px' }}>
              1. NOISE GATE (PREAMP)
            </span>
            <p style={{ margin: 0 }}>
              A high-precision envelope detector. Adjust the threshold slider until the background line hiss and hum instantly silence the moment you stop plucking your guitar strings.
            </p>
          </li>
          <li>
            <span style={{ color: 'var(--color-cyan)', fontWeight: 'bold', fontSize: '0.85rem', display: 'block', marginBottom: '2px' }}>
              2. SATURATION (DRIVE)
            </span>
            <p style={{ margin: 0 }}>
              An asymmetric tube-style waveshaping overdrive. *Drive* dials in clipping saturation gain, and *Character* controls second-order even harmonics for tube warmth.
            </p>
          </li>
          <li>
            <span style={{ color: 'var(--color-green)', fontWeight: 'bold', fontSize: '0.85rem', display: 'block', marginBottom: '2px' }}>
              3. AMP EQ (3-BAND PARAMETRIC)
            </span>
            <p style={{ margin: 0 }}>
              Studio biquad filters. Cut **Mid** for modern heavy metal scoop; boost **Bass** and **Treble** for acoustic brightness or clean jazz warmth.
            </p>
          </li>
          <li>
            <span style={{ color: 'var(--color-violet)', fontWeight: 'bold', fontSize: '0.85rem', display: 'block', marginBottom: '2px' }}>
              4. SPEAKER CABINET & CONVOLVER REVERB
            </span>
            <p style={{ margin: 0 }}>
              *Low Cut* and *Air* filters simulate physical speaker cabinet resonance. The *Reverb* slider blends in a real-time room impulse convolver to simulate space.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
