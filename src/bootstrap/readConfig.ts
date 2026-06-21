import type { WidgetConfig } from './types';

const DEFAULT_BASE_URL = 'https://staging-saiz-app.com';

const required = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`[SAIZ] missing required data-${name} attribute`);
  return value;
};

export const readWidgetConfig = (el: HTMLElement): WidgetConfig => {
  const data = el.dataset;
  const apiKey = (import.meta.env.VITE_SAIZ_API_KEY ?? '').trim();
  const baseUrl = (import.meta.env.VITE_SAIZ_BASE_URL ?? DEFAULT_BASE_URL).trim();

  return {
    brandCode: required(data.brandcode, 'brandcode'),
    productCode: required(data.productcode, 'productcode'),
    visitorId: data.visitorid ?? 'anonymous',
    language: data.language ?? 'en-us',
    apiKey,
    baseUrl,
  };
};
