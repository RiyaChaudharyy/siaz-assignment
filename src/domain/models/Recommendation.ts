import type { SizeRange } from './Product';

export type FitStatus = 'tight' | 'good' | 'loose';
export type FitArea = 'chest' | 'waist';

export interface FitZone {
  area: FitArea;
  status: FitStatus;
  label: string;
}

export type SizeDirection = 'up' | 'down' | 'none';

export interface Recommendation {
  recommendedSize: string;
  expectedSize: string;
  direction: SizeDirection;
  message: string;
  fit: FitZone[];
  ladder: string[];
  recommendedIndex: number;
  userChest: number;
  recommendedRange?: SizeRange;
}
