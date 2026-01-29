import React from 'react';

interface FocusControlProps {
  focusValue: number;
  onFocusChange: (value: number) => void;
  onAutoFocus: () => void;
  isFocused: boolean;
}

export const FocusControl: React.FC<FocusControlProps> = ({ 
  focusValue, 
  onFocusChange, 
  onAutoFocus,
  isFocused 
}) => {
  return (
    <div className="focus-control-section">
      <div className="focus-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
        <span>Focus Control</span>
      </div>
      
      <div className="focus-slider-container">
        <div className="focus-value">{focusValue.toFixed(2)}</div>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={focusValue}
          onChange={(e) => onFocusChange(parseFloat(e.target.value))}
          className="focus-slider"
          aria-label="Focus adjustment"
        />
        
        <div className="focus-labels">
          <span>Close</span>
          <span>Far</span>
        </div>
      </div>
      
      <div className="focus-buttons">
        <button 
          className={`focus-btn ${isFocused ? 'active' : ''}`}
          onClick={onAutoFocus}
        >
          Auto Focus
        </button>
        <button 
          className="focus-btn"
          onClick={() => onFocusChange(0.5)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
