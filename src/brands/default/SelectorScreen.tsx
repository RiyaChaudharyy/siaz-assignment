import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { next } from '../../store/slices/navigationSlice';
import { setAge, setGender, setHeight, setUnit, setWeight } from '../../store/slices/measurementsSlice';
import { rangeFor, unitLabels } from '../../utils/units';
import { Button } from '../../ui/components/Button';
import { GenderSelect } from '../../ui/components/GenderSelect';
import { Stepper } from '../../ui/components/Stepper';
import { UnitToggle } from '../../ui/components/UnitToggle';

export const SelectorScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const m = useAppSelector((s) => s.measurements);
  const labels = unitLabels(m.unit);
  const range = rangeFor(m.unit);

  return (
    <div className="saiz-screen">
      <div className="saiz-intro">
        <h2 className="saiz-title">Welcome to // SAIZ<br/> Recommender</h2>
        <p className="saiz-subtitle">Let&rsquo;s calculate the size that suits you best</p>
      </div>

      <div className="saiz-unitrow">
        <UnitToggle value={m.unit} onChange={(u) => dispatch(setUnit(u))} />
      </div>

      <GenderSelect value={m.gender} onChange={(g) => dispatch(setGender(g))} />

      <div className="saiz-steprow-container">
        <Stepper
          label="Age"
          value={m.age}
          min={range.age.min}
          max={range.age.max}
          onChange={(v) => dispatch(setAge(v))}
        />
        <Stepper
          label="Weight"
          unit={labels.weight}
          value={m.weight}
          min={range.weight.min}
          max={range.weight.max}
          onChange={(v) => dispatch(setWeight(v))}
        />
        <Stepper
          label="Height"
          unit={labels.height}
          value={m.height}
          min={range.height.min}
          max={range.height.max}
          onChange={(v) => dispatch(setHeight(v))}
        />
      </div>

      <Button onClick={() => dispatch(next())}>Get your size recommendation</Button>
    </div>
  );
};
