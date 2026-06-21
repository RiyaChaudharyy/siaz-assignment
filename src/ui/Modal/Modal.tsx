import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { back, goTo } from '../../store/slices/navigationSlice';
import type { ScreenId } from '../../store/slices/navigationSlice';
import { createScreens } from '../../brands/screenFactory';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { BackIcon, CloseIcon, InfoIcon, Wordmark } from '../components/Icons';

export interface ModalProps {
  brandCode: string;
}
const PROGRESS: Record<ScreenId, number> = { selector: 0.5, info: 0.5, recommendation: 1 };

export const Modal = ({ brandCode }: ModalProps) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.navigation.current);
  const [open, setOpen] = useState(true);

  const screens = useMemo(() => createScreens(brandCode), [brandCode]);
  const canGoBack = current !== 'selector';

  if (!open) return null;

  const Screen =
    current === 'recommendation' ? screens.Recommendation : current === 'info' ? screens.Info : screens.Selector;

  return (
    <div className="saiz-overlay" role="presentation">
      <div
        className="saiz-card"
        role="dialog"
        aria-modal="true"
        aria-label={`${screens.brandName} size recommender`}
      >
        <header className="saiz-head">
          <div className="saiz-head__bar">
            <div className="saiz-head__left">
              {canGoBack ? (
                <button type="button" className="saiz-iconbtn" aria-label="Go back" onClick={() => dispatch(back())}>
                  <BackIcon />
                </button>
              ) : (
                <button
                  type="button"
                  className="saiz-iconbtn saiz-iconbtn--ring"
                  aria-label="How it works"
                  onClick={() => dispatch(goTo('info'))}
                >
                  <InfoIcon />
                </button>
              )}
            </div>

            <Wordmark />

            <div className="saiz-head__right">
              <ThemeSwitch />
              <button type="button" className="saiz-iconbtn" aria-label="Close" onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="saiz-progress">
            <span className="saiz-progress__fill" style={{ width: `${PROGRESS[current] * 100}%` }} />
          </div>
        </header>

        <div className="saiz-card__body">
          <Screen />
        </div>
      </div>
    </div>
  );
};
