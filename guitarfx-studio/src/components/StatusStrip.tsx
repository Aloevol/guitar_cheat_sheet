import React from 'react';
import type { EngineStatus } from '../types/guitar';

interface StatusStripProps {
  engineStatus: EngineStatus;
  latencyValue: string;
  inputMeterRef: React.RefObject<HTMLDivElement | null>;
  outputMeterRef: React.RefObject<HTMLDivElement | null>;
}

export const StatusStrip: React.FC<StatusStripProps> = ({
  engineStatus,
  latencyValue,
  inputMeterRef,
  outputMeterRef
}) => {
  const getStatusClass = (status: EngineStatus) => {
    const lower = status.toLowerCase();
    if (lower === 'running') return 'running';
    if (lower === 'starting') return 'starting';
    return 'stopped';
  };

  return (
    <section className="status-strip panel-base" aria-label="Audio status">
      <div className="status-item">
        <span className="control-label">DSP Engine</span>
        <strong id="engineStatus" className={`status-value ${getStatusClass(engineStatus)}`}>
          {engineStatus}
        </strong>
      </div>
      
      <div className="status-item meter-container">
        <span className="control-label">Input Level</span>
        <div className="meter-wrapper">
          <div ref={inputMeterRef} id="inputMeter" className="meter-fill" />
        </div>
      </div>

      <div className="status-item meter-container">
        <span className="control-label">Output Level</span>
        <div className="meter-wrapper">
          <div ref={outputMeterRef} id="outputMeter" className="meter-fill" />
        </div>
      </div>

      <div className="status-item">
        <span className="control-label">Roundtrip Latency</span>
        <strong id="latencyValue" className="status-value">
          {latencyValue}
        </strong>
      </div>
    </section>
  );
};
