import React from 'react';
import type { DeviceOption } from '../types/guitar';

interface RoutingPanelProps {
  inputs: DeviceOption[];
  outputs: DeviceOption[];
  factoryPresets: string[];
  userPresets: string[];
  selectedInput: string;
  selectedOutput: string;
  selectedPreset: string;
  onInputChange: (id: string) => void;
  onOutputChange: (id: string) => void;
  onPresetChange: (name: string) => void;
  onSavePreset: () => void;
}

export const RoutingPanel: React.FC<RoutingPanelProps> = ({
  inputs,
  outputs,
  factoryPresets,
  userPresets,
  selectedInput,
  selectedOutput,
  selectedPreset,
  onInputChange,
  onOutputChange,
  onPresetChange,
  onSavePreset
}) => {
  return (
    <section className="routing-panel panel-base" aria-label="Audio routing">
      <div className="control-group">
        <label htmlFor="inputSelect" className="control-label">Guitar Input</label>
        <select 
          id="inputSelect" 
          className="select-custom" 
          value={selectedInput} 
          onChange={(e) => onInputChange(e.target.value)}
        >
          {inputs.length === 0 ? (
            <option value="">Start Audio to list inputs</option>
          ) : (
            inputs.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="outputSelect" className="control-label">Output Device</label>
        <select 
          id="outputSelect" 
          className="select-custom" 
          value={selectedOutput} 
          onChange={(e) => onOutputChange(e.target.value)}
        >
          {outputs.length === 0 ? (
            <option value="">Default Output</option>
          ) : (
            outputs.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="presetSelect" className="control-label">Active Preset</label>
        <select 
          id="presetSelect" 
          className="select-custom" 
          value={selectedPreset} 
          onChange={(e) => onPresetChange(e.target.value)}
        >
          <optgroup label="Factory Tones">
            {factoryPresets.map((name) => (
              <option key={`builtin:${name}`} value={`builtin:${name}`}>
                {name}
              </option>
            ))}
          </optgroup>
          {userPresets.length > 0 && (
            <optgroup label="User Tones">
              {userPresets.map((name) => (
                <option key={`saved:${name}`} value={`saved:${name}`}>
                  {name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </div>

      <button 
        id="savePresetButton" 
        className="btn btn-secondary" 
        type="button" 
        onClick={onSavePreset}
      >
        Save Preset
      </button>
    </section>
  );
};
