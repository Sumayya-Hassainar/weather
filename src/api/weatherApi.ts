// src/api/weatherApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OPENWEATHER_KEY = import.meta.env.VITE_OWM_KEY as string;

export interface OneCallArgs {
  lat: number;
  lon: number;
  units?: 'metric' | 'imperial';
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/3.0/' }),
  tagTypes: ['Weather'],
  endpoints: (build) => ({
    getOneCall: build.query<any, OneCallArgs>({
      query: ({ lat, lon, units = 'metric' }) =>
        `onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${OPENWEATHER_KEY}`,
      providesTags: (_result, _error, arg) => [{ type: 'Weather', id: `${arg.lat}_${arg.lon}` }],

      keepUnusedDataFor: 300,
    }),
    geocode: build.query<any[], string>({
      query: (q) => `geo/1.0/direct?q=${encodeURIComponent(q)}&limit=6&appid=${OPENWEATHER_KEY}`,
      keepUnusedDataFor: 60,
    }),
    // basic historical (timemachine) endpoint (note: may require paid plan)
    getHistorical: build.query<any, { lat: number; lon: number; dt: number; units?: 'metric' | 'imperial' }>({
      query: ({ lat, lon, dt, units = 'metric' }) =>
        `onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&units=${units}&appid=${OPENWEATHER_KEY}`,
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetOneCallQuery, useGeocodeQuery, useGetHistoricalQuery } = weatherApi;
