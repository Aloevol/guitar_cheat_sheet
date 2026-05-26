import React from 'react';

interface KnobControlProps {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
  valueFormatter: (val: number) => string;
}

export const KnobControl: React.FC<KnobControlProps> = ({
  label,
  id,
  min,
  max,
  step,
  value,
  onChange,
  valueFormatter
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="knob-control">
      <div className="knob-label-row">
        <label htmlFor={id} className="knob-label">{label}</label>
        <span className="knob-value">{valueFormatter(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider-custom"
      />
    </div>
  );
};
