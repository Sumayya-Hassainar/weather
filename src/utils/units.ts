// src/utils/units.ts
export const toDisplayTemp = (v: number, units: 'metric' | 'imperial') =>
  `${Math.round(v)}°${units === 'metric' ? 'C' : 'F'}`;

export const degToCompass = (num: number) => {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return arr[(val % 16)];
};

export const formatTime = (unix: number, timezoneOffset = 0) => {
  const d = new Date((unix + timezoneOffset) * 1000);
  return d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
};
