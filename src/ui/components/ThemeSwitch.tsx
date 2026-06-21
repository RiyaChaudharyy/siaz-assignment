import React from 'react';
import { useModel } from '../../theme/ModelContext';
import { MoonIcon, SunIcon } from './Icons';

export const ThemeSwitch: React.FC = () => {
  const { mode, toggleTheme } = useModel();
  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark theme"
      className="saiz-iconbtn"
      onClick={toggleTheme}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
