import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ScreenId = 'selector' | 'info' | 'recommendation';

export const ORDER: ScreenId[] = ['selector', 'recommendation'];

const initialState = {
  current: 'selector' as ScreenId,
};

export type NavigationState = typeof initialState;

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    goTo: (state, action: PayloadAction<ScreenId>) => {
      state.current = action.payload;
    },
    next: (state) => {
      const idx = ORDER.indexOf(state.current);
      state.current = ORDER[Math.min(ORDER.length - 1, idx + 1)];
    },
    back: (state) => {
      const idx = ORDER.indexOf(state.current);
      state.current = ORDER[Math.max(0, idx - 1)];
    },
  },
});

export const { goTo, next, back } = navigationSlice.actions;
export default navigationSlice.reducer;
