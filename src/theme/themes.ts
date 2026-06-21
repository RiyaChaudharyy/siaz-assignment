import type { ThemeTokens } from './types';

const FONT =
  "'Archivo', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const RADIUS = '18px';

const TIGHT = '#EB7956';
const GOOD = '#7BBA80';
const LOOSE = '#E0A83E';

const saizLight: ThemeTokens = {
  name: 'saiz-light',
  radius: RADIUS,
  font: FONT,
  colors: {
    bg: '#ffffff',
    surface: '#ffffff',
    text: '#0a0a0a',
    muted: '#0F0F10',
    primary: '#0a0a0a',
    onPrimary: '#ffffff',
    border: '#e6e6e6',
    track: '#f1f1f1',
    tight: TIGHT,
    good: GOOD,
    loose: LOOSE,
    overlay: 'rgba(15, 15, 15, 0.55)',
    subText: '#B5B5BE',
  },
};

const saizDark: ThemeTokens = {
  name: 'saiz-dark',
  radius: RADIUS,
  font: FONT,
  colors: {
    bg: '#0c0c0d',
    surface: '#161618',
    text: '#fafafa',
    muted: '#9a9a9e',
    primary: '#fafafa',
    onPrimary: '#0c0c0d',
    border: '#2a2a2e',
    track: '#232327',
    tight: TIGHT,
    good: GOOD,
    loose: LOOSE,
    overlay: 'rgba(0, 0, 0, 0.66)',
    subText: '#B5B5BE',
  },
};

export type ThemeModeName = 'light' | 'dark';

interface BrandPalette {
  light: ThemeTokens;
  dark: ThemeTokens;
}

const BRAND_THEMES: Record<string, BrandPalette> = {
  default: { light: saizLight, dark: saizDark },
  ohapril: { light: saizLight, dark: saizDark },
};

export const resolveTheme = (brandCode: string, mode: ThemeModeName): ThemeTokens => {
  const palette = BRAND_THEMES[brandCode.toLowerCase()] ?? BRAND_THEMES.default;
  return mode === 'dark' ? palette.dark : palette.light;
};
