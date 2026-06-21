import React from 'react';

export interface StepperProps {
  label: string;
  unit?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

const OFFSETS = [-2, -1, 0, 1, 2];

export const Stepper: React.FC<StepperProps> = ({ label, unit, value, min, max, step = 1, onChange }) => {
  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (clamped !== value) onChange(clamped);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      set(value - step);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      set(value + step);
    }
  };

  return (
    <div className="saiz-stepcard">
      <div className="saiz-stepcard__label">
        {label}
        {unit ? <sup className="saiz-stepcard__unit">{unit}</sup> : null}
      </div>

      <div
        className="saiz-picker"
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        onKeyDown={onKey}
      >
        {OFFSETS.map((off) => {
          const v = value + off * step;
          const inRange = v >= min && v <= max;
          return (
            <button
              key={off}
              type="button"
              className={`saiz-picker__n saiz-picker__n--d${Math.abs(off)}${off === 0 ? ' is-active' : ''}`}
              tabIndex={-1}
              aria-hidden={off !== 0}
              disabled={!inRange}
              onClick={() => set(v)}
            >
              {inRange ? v : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};
