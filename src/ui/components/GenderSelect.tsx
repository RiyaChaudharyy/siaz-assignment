import React from 'react';
import type { Gender } from '../../domain/models/Measurements';

export interface GenderSelectProps {
  value: Gender;
  onChange: (value: Gender) => void;
}

const OPTIONS: { label: string; value: Gender }[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const Check: React.FC = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
    <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GenderSelect: React.FC<GenderSelectProps> = ({ value, onChange }) => (
  <div className="saiz-gencard">
    <span className="saiz-gencard__label">Gender</span>
    <div className="saiz-genopts" role="radiogroup" aria-label="Gender">
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            className={`saiz-genopt${active ? ' is-active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="saiz-genopt__txt">{opt.label}</span>
            <span className="saiz-genopt__radio">{active ? <Check /> : null}</span>
          </button>
        );
      })}
    </div>
  </div>
);
