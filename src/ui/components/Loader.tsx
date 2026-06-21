import React from 'react';

export interface LoaderProps {
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({ label = 'Analyzing the product…' }) => (
  <div className="saiz-loader" role="status" aria-live="polite">
    <span className="saiz-spinner" aria-hidden="true" />
    <span className="saiz-loader__label">{label}</span>
  </div>
);
