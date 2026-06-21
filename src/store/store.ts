import { configureStore } from '@reduxjs/toolkit';
import type { AppDeps } from './deps';
import productReducer from './slices/productSlice';
import navigationReducer from './slices/navigationSlice';
import measurementsReducer from './slices/measurementsSlice';
import themeReducer from './slices/themeSlice';

export const createStore = (deps: AppDeps) =>
  configureStore({
    reducer: {
      product: productReducer,
      navigation: navigationReducer,
      measurements: measurementsReducer,
      theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: deps } }),
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
