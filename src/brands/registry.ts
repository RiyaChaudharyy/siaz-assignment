import type { BrandScreens } from './types';
import { SelectorScreen } from './default/SelectorScreen';
import { InfoScreen } from './default/InfoScreen';
import { RecommendationScreen } from './default/RecommendationScreen';

const defaultScreens: BrandScreens = {
  brandName: 'SAIZ',
  Selector: SelectorScreen,
  Info: InfoScreen,
  Recommendation: RecommendationScreen,
};

export const BRAND_SCREEN_REGISTRY: Record<string, BrandScreens> = {
  default: defaultScreens,
  ohapril: defaultScreens,
};
