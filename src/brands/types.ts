import type React from 'react';

export interface BrandScreens {
  brandName: string;
  Selector: React.ComponentType;
  Info: React.ComponentType;
  Recommendation: React.ComponentType;
}
