import { BRAND_SCREEN_REGISTRY } from './registry';
import type { BrandScreens } from './types';

export const createScreens = (brandCode: string): BrandScreens =>
  BRAND_SCREEN_REGISTRY[brandCode.toLowerCase()] ?? BRAND_SCREEN_REGISTRY.default;
