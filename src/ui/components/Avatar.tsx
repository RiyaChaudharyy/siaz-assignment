import React from 'react';
import type { FitArea, FitZone } from '../../domain/models/Recommendation';
import tshirt from '../../public/assets/tshirt.png';

export interface AvatarProps {
  fit: FitZone[];
}

const LINE_Y: Record<FitArea, number> = { chest: 40, waist: 60 };

const STATUS_VAR: Record<string, string> = {
  tight: 'var(--saiz-tight)',
  good: 'var(--saiz-good)',
  loose: 'var(--saiz-loose)',
};

export const Avatar: React.FC<AvatarProps> = ({ fit }) => (
  <div className="saiz-figure">
    <img src={tshirt} alt="Fit preview" className="saiz-figure__img" />

    {fit.map((zone) => {
      const color = STATUS_VAR[zone.status];
      return (
        <div key={zone.area} className="saiz-fitrow" style={{ top: `${LINE_Y[zone.area]}%` }}>
          <span className="saiz-fitline" style={{ color }} />
          <span className={`saiz-fitbadge saiz-fitbadge--${zone.status}`}>{zone.label}</span>
          <span className="saiz-fitline" style={{ color }} />
        </div>
      );
    })}
  </div>
);
