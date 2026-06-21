import React, { createContext, useContext, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleMode } from '../store/slices/themeSlice';
import type { ThemeMode } from '../store/slices/themeSlice';
import { resolveTheme } from './themes';
import type { ThemeTokens } from './types';

export interface ModelContextValue {
  brand: string;
  mode: ThemeMode;
  theme: ThemeTokens;
  toggleTheme: () => void;
}

const ModelContext = createContext<ModelContextValue | null>(null);

export const useModel = (): ModelContextValue => {
  const ctx = useContext(ModelContext);
  if (!ctx) throw new Error('useModel must be used within a ModelProvider');
  return ctx;
};

export const themeToCssVars = (theme: ThemeTokens): CSSProperties => {
  const c = theme.colors;
  return {
    '--saiz-bg': c.bg,
    '--saiz-surface': c.surface,
    '--saiz-text': c.text,
    '--saiz-muted': c.muted,
    '--saiz-primary': c.primary,
    '--saiz-on-primary': c.onPrimary,
    '--saiz-border': c.border,
    '--saiz-track': c.track,
    '--saiz-tight': c.tight,
    '--saiz-good': c.good,
    '--saiz-loose': c.loose,
    '--saiz-overlay': c.overlay,
    '--saiz-radius': theme.radius,
    '--saiz-font': theme.font,
    '--saiz-subText': c.subText,
  } as CSSProperties;
};

export interface ModelProviderProps {
  brand: string;
  children: ReactNode;
}

export const ModelProvider: React.FC<ModelProviderProps> = ({ brand, children }) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);

  const value = useMemo<ModelContextValue>(
    () => ({
      brand,
      mode,
      theme: resolveTheme(brand, mode),
      toggleTheme: () => dispatch(toggleMode()),
    }),
    [brand, mode, dispatch],
  );

  return (
    <ModelContext.Provider value={value}>
      <div className="saiz-root" data-mode={mode} style={themeToCssVars(value.theme)}>
        {children}
      </div>
    </ModelContext.Provider>
  );
};
