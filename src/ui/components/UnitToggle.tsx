import React from 'react';
import type { Unit } from '../../domain/models/Measurements';

export interface UnitToggleProps {
  value: Unit;
  onChange: (unit: Unit) => void;
}

const OPTIONS: Unit[] = ['cm', 'in'];

export const UnitToggle: React.FC<UnitToggleProps> = ({ value, onChange }) => (
  <div className="saiz-pill" role="group" aria-label="Measurement system">
    {OPTIONS.map((opt) => (
      <button
        key={opt}
        type="button"
        className={`saiz-pill__opt${value === opt ? ' is-active' : ''}`}
        aria-pressed={value === opt}
        onClick={() => onChange(opt)}
      >
        {opt}
      </button>
    ))}
  </div>
);
