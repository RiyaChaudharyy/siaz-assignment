import { useAppDispatch } from '../../store/hooks';
import { goTo } from '../../store/slices/navigationSlice';
import { Button } from '../../ui/components/Button';

const STEPS = [
  'On entering these details, we can calculate your probable size, which we will then compare with the sizes of the selected article in order to recommend the best size for you.',
  'The information you provide will remain anonymous and will only be used for recommending your size.',
  'Help us to cut down the number of returns and make a positive contribution towards the environment.',
];

export const InfoScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="saiz-screen saiz-howto">
      <h2 className="saiz-howto__title">How // SAIZ works</h2>

      <div className="saiz-howto__list">
        {STEPS.map((text, i) => (
          <div key={i} className="saiz-howto__card">
            <p className="saiz-howto__text">{text}</p>
            <span className="saiz-howto__num">{i + 1}</span>
          </div>
        ))}
      </div>

      <Button onClick={() => dispatch(goTo('recommendation'))}>Get your size recommendation</Button>
    </div>
  );
};
