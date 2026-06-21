import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { back } from '../../store/slices/navigationSlice';
import { recommendationEngine } from '../../domain/services/recommendationEngine';
import { Avatar } from '../../ui/components/Avatar';
import { Button } from '../../ui/components/Button';
import { BagIcon, PersonIcon, RulerIcon } from '../../ui/components/Icons';

export const RecommendationScreen = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((s) => s.product.data);
  const measurements = useAppSelector((s) => s.measurements);

  const reco = useMemo(
    () => (product ? recommendationEngine.recommend(measurements, product) : null),
    [product, measurements],
  );

  if (!product || !reco) {
    return (
      <div className="saiz-screen">
        <p className="saiz-subtitle">No product data available.</p>
      </div>
    );
  }

  return (
    <div className="saiz-screen saiz-reco">
      <h2 className="saiz-title">// SAIZ Recommendation</h2>

      <div className="saiz-keycap" aria-label={`Recommended size ${reco.recommendedSize}`}>
        <span className="saiz-keycap__val">{reco.recommendedSize}</span>
      </div>

      <p className="saiz-reco__message">{reco.message}</p>

      <div className="saiz-reco__stage">
        <div className="saiz-reco__actions-left">
          <button type="button" className="saiz-action" onClick={() => dispatch(back())}>
            <span className="saiz-action__btn"><PersonIcon /></span>
            <span className="saiz-action__label">Change avatar</span>
          </button>
          <button type="button" className="saiz-action" onClick={() => dispatch(back())}>
            <span className="saiz-action__btn"><RulerIcon /></span>
            <span className="saiz-action__label">Enter your measurements</span>
          </button>
        </div>
        <Avatar fit={reco.fit} />
      </div>

      <div className="saiz-reco__cta">
        <Button variant="outline">Learn more about sizes</Button>
        <Button>
          <span className="saiz-btn__icon"><BagIcon /></span>
          Shop now
        </Button>
      </div>
    </div>
  );
};
