// src/components/charts/TempChart.tsx

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Brush,
} from 'recharts';

type Hour = { dt: number; temp: number; pop?: number };
export default function TempChart({ hourly, timezoneOffset, units: _units }: { hourly: Hour[]; timezoneOffset?: number; units: 'metric'|'imperial' }) {

  const data = hourly.map((h) => ({
    time: new Date((h.dt + (timezoneOffset ?? 0)) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(h.temp),
    pop: Math.round((h.pop ?? 0) * 100),
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" minTickGap={20} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="temp" dot={false} />
          <Brush dataKey="time" height={30} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
