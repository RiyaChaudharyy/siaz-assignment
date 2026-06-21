import type { Measurements } from '../models/Measurements';
import type { FitStatus, FitZone, Recommendation, SizeDirection } from '../models/Recommendation';
import type { MeasureKey, Product, SizeRange } from '../models/Product';

const FIT_LABEL: Record<FitStatus, string> = {
  tight: 'too tight',
  good: 'fits right',
  loose: 'too loose',
};

const MEASURE_KEYS: MeasureKey[] = ['chest', 'waist', 'hip', 'length'];

const clampIndex = (i: number, len: number) => Math.min(len - 1, Math.max(0, i));

const toCm = (m: Measurements) => (m.unit === 'cm' ? m.height : m.height * 2.54);
const toKg = (m: Measurements) => (m.unit === 'cm' ? m.weight : m.weight * 0.45359237);

const estimateChest = (m: Measurements): number => {
  const base = m.gender === 'female' ? 48 : m.gender === 'other' ? 50 : 52;
  return Math.round(base + 0.55 * toKg(m) + 0.22 * (toCm(m) - 170));
};

const midpoint = (r?: SizeRange) => (r ? (r.min + r.max) / 2 : Number.POSITIVE_INFINITY);

const cutShiftFor = (p: Product) => (p.fitProfile === 'small' ? 1 : p.fitProfile === 'large' ? -1 : 0);

export interface RecommendationEngine {
  recommend(measurements: Measurements, product: Product): Recommendation;
}

const createFitZones = (
  product: Product,
  recommendedIndex: number,
  chestStatus: FitStatus,
): FitZone[] => {
  const recommendedSize = product.sizes[recommendedIndex];

  return MEASURE_KEYS.flatMap((area) => {
    const shouldShowArea =
      product.display[area] &&
      Boolean(recommendedSize?.ranges[area]);

    if (!shouldShowArea || area !== 'chest') {
      return [];
    }

    return [
      {
        area,
        status: chestStatus,
        label: FIT_LABEL[chestStatus],
      },
    ];
  });
};

export const recommendationEngine: RecommendationEngine = {
  recommend(measurements, product) {
    const ladder = product.sizes.map((s) => s.label);
    const chest = estimateChest(measurements);

    let recommendedIndex = product.sizes.findIndex((s) => {
      const r = s.ranges.chest;
      return r ? chest >= r.min && chest <= r.max : false;
    });

    if (recommendedIndex === -1) {
      let best = 0;
      let bestDist = Infinity;
      product.sizes.forEach((s, i) => {
        const d = Math.abs(midpoint(s.ranges.chest) - chest);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      recommendedIndex = best;
    }
    recommendedIndex = clampIndex(recommendedIndex, ladder.length);

    const cut = cutShiftFor(product);
    const expectedIndex = clampIndex(recommendedIndex - cut, ladder.length);
    const recommendedSize = ladder[recommendedIndex];
    const expectedSize = ladder[expectedIndex];

    const delta = recommendedIndex - expectedIndex;
    const direction: SizeDirection = delta > 0 ? 'up' : delta < 0 ? 'down' : 'none';

    const message =
      direction === 'up'
        ? `We believe your expected size ${expectedSize} will be too small. We recommend going a size up.`
        : direction === 'down'
          ? `We believe your expected size ${expectedSize} will be too large. We recommend going a size down.`
          : `Your expected size ${expectedSize} should fit you well.`;

    const chestStatus: FitStatus = direction === 'up' ? 'tight' : direction === 'down' ? 'loose' : 'good';

    const fit = createFitZones(product, recommendedIndex, chestStatus);

    return {
      recommendedSize,
      expectedSize,
      direction,
      message,
      fit,
      ladder,
      recommendedIndex,
      userChest: chest,
      recommendedRange: product.sizes[recommendedIndex]?.ranges.chest,
    };
  },
};
