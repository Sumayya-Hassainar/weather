// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '../api/weatherApi';
import favoritesReducer from '../features/favorites/favoritesSlice';
import settingsReducer from '../features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
