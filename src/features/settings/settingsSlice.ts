// src/features/settings/settingsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


const LOCAL_KEY = 'weather:settings_v1';

export type SettingsState = {
  units: 'metric' | 'imperial';
  pollingSeconds: number;
};

const defaultState: SettingsState = { units: 'metric', pollingSeconds: 60 };

const load = (): SettingsState => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : defaultState;
  } catch {
    return defaultState;
  }
};
const save = (s: SettingsState) => localStorage.setItem(LOCAL_KEY, JSON.stringify(s));

const slice = createSlice({
  name: 'settings',
  initialState: load(),
  reducers: {
    setUnits(state, action: PayloadAction<'metric' | 'imperial'>) {
      state.units = action.payload;
      save(state);
    },
    setPolling(state, action: PayloadAction<number>) {
      state.pollingSeconds = action.payload;
      save(state);
    },
  },
});

export const { setUnits, setPolling } = slice.actions;
export default slice.reducer;
