import React from 'react';

interface HeaderProps {
  isEngineRunning: boolean;
  isStarting: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isEngineRunning,
  isStarting,
  onStart,
  onStop
}) => {
  return (
    <header className="topbar panel-base">
      <div className="topbar-title-section">
        <p className="eyebrow">GuitarFX Studio v2.0</p>
        <h1>Live Guitar Effects</h1>
      </div>
      <div className="transport">
        {!isEngineRunning ? (
          <button 
            id="startButton" 
            className="btn btn-primary" 
            type="button" 
            onClick={onStart}
            disabled={isStarting}
          >
            {isStarting ? "Initializing..." : "Start Audio"}
          </button>
        ) : (
          <button 
            id="stopButton" 
            className="btn btn-danger" 
            type="button" 
            onClick={onStop}
          >
            Stop Audio
          </button>
        )}
      </div>
    </header>
  );
};
