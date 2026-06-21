import React from 'react';

export const Wordmark: React.FC = () => (
  <span className="saiz-wordmark" aria-label="SAIZ">
    <span className="saiz-wordmark__slash">//</span> SAIZ
  </span>
);

interface IconProps {
  size?: number;
}

export const BackIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="7.4" r="1.15" fill="currentColor" />
  </svg>
);

export const PersonIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M5.5 19a6.5 6.5 0 0113 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const RulerIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.2" y="8.4" width="17.6" height="7.2" rx="1.6" transform="rotate(-1 12 12)" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7 8.6v2.4M10 8.6v3.4M13 8.6v2.4M16 8.6v3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const BagIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 8h12l-1 11a1 1 0 01-1 1H8a1 1 0 01-1-1L6 8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M9 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M21 12.8A8.5 8.5 0 1111.2 3a6.6 6.6 0 009.8 9.8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);
