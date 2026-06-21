import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Gender, Measurements, Unit } from '../../domain/models/Measurements';
import { clamp, convertHeight, convertWeight, rangeFor } from '../../utils/units';

const initialState: Measurements = {
  unit: 'cm',
  gender: 'male',
  age: 27,
  weight: 80,
  height: 180,
};

const measurementsSlice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<Unit>) => {
      const from = state.unit;
      const to = action.payload;
      if (from === to) return;

      const r = rangeFor(to);
      state.weight = clamp(convertWeight(state.weight, from, to), r.weight);
      state.height = clamp(convertHeight(state.height, from, to), r.height);
      state.age = clamp(state.age, r.age);
      state.unit = to;
    },
    setGender: (state, action: PayloadAction<Gender>) => {
      state.gender = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = clamp(action.payload, rangeFor(state.unit).age);
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.weight = clamp(action.payload, rangeFor(state.unit).weight);
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = clamp(action.payload, rangeFor(state.unit).height);
    },
    setMeasurements: (_state, action: PayloadAction<Measurements>) => action.payload,
  },
});

export const { setUnit, setGender, setAge, setWeight, setHeight, setMeasurements } =
  measurementsSlice.actions;
export default measurementsSlice.reducer;
