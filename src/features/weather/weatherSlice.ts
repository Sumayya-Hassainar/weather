// src/features/weather/weatherSlice.ts
// Optional extra local state - keep minimal for now.
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'weatherLocal',
  initialState: { activeCityKey: null as string | null },
  reducers: {
    setActiveCity(state, action: { payload: string | null }) {
      state.activeCityKey = action.payload;
    },
  },
});

export const { setActiveCity } = slice.actions;
export default slice.reducer;
