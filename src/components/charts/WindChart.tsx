// src/components/charts/WindChart.tsx

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

type Hour = { dt: number; wind_speed: number };
export default function WindChart({ hourly, timezoneOffset }: { hourly: Hour[]; timezoneOffset?: number }) {
  const data = hourly.map((h) => ({
    time: new Date((h.dt + (timezoneOffset ?? 0)) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    wind: Math.round(h.wind_speed),
  }));

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="wind" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
