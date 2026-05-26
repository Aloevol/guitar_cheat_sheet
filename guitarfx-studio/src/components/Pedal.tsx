import React from 'react';

interface PedalProps {
  title: string;
  brand: string;
  themeClass: string;
  ledColor: 'red' | 'gold' | 'cyan' | 'green' | 'violet';
  isActive: boolean;
  onBypassToggle?: () => void;
  bypassLabel?: string;
  children: React.ReactNode;
}

export const Pedal: React.FC<PedalProps> = ({
  title,
  brand,
  themeClass,
  ledColor,
  isActive,
  onBypassToggle,
  bypassLabel = "Bypass",
  children
}) => {
  return (
    <article className={`pedal ${themeClass}`}>
      <div className="pedal-header">
        <div className="pedal-title-area">
          <span className="pedal-brand">{brand}</span>
          <h2>{title}</h2>
        </div>
        <div className={`led-indicator led-${ledColor} ${isActive ? 'active' : ''}`} />
      </div>

      <div className="controls-container">
        {children}
      </div>

      <div className="footswitch-area">
        <button 
          type="button" 
          className="footswitch" 
          onClick={onBypassToggle}
          aria-label={onBypassToggle ? `Toggle ${title} ${bypassLabel}` : undefined}
          disabled={!onBypassToggle}
        />
        <span className="footswitch-label">
          {onBypassToggle ? bypassLabel : "Active"}
        </span>
      </div>
    </article>
  );
};
