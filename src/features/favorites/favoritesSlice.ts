// src/features/favorites/favoritesSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const LOCAL_KEY = 'weather:favorites_v1';

// We'll store favorites as { key: string, name: string, lat: number, lon: number }[]
export type FavoriteCity = {
  key: string; // e.g., `${lat}_${lon}`
  name: string;
  lat: number;
  lon: number;
};

const load = (): FavoriteCity[] => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
const save = (s: FavoriteCity[]) => localStorage.setItem(LOCAL_KEY, JSON.stringify(s));

const slice = createSlice({
  name: 'favorites',
  initialState: load() as FavoriteCity[],
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteCity>) {
      if (!state.find((c) => c.key === action.payload.key)) {
        state.push(action.payload);
        save(state);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const idx = state.findIndex((c) => c.key === action.payload);
      if (idx >= 0) {
        state.splice(idx, 1);
        save(state);
      }
    },
    setFavorites(state, action: PayloadAction<FavoriteCity[]>) {
      state.splice(0, state.length, ...action.payload);
      save(state);
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = slice.actions;
export default slice.reducer;
