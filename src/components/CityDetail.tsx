// src/components/CityDetail.tsx

import TempChart from './charts/TempChart';
import WindChart from './charts/WindChart';
import { toDisplayTemp, degToCompass } from '../utils/units';

export default function CityDetail({ city, data, onClose }: { city: any; data: any; onClose: () => void }) {
  if (!data) return null;

  const timezoneOffset = data.timezone_offset ?? 0;
  return (
    <div style={{
      position: 'fixed', top: 40, left: 40, right: 40, bottom: 40, background: 'white', border: '1px solid #ddd',
      padding: 16, overflow: 'auto', zIndex: 2000, borderRadius: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{city.name} — Details</h2>
        <button onClick={onClose}>Close</button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        <div style={{ flex: 1 }}>
          <h4>Hourly (next 48h)</h4>
          <TempChart hourly={data.hourly.slice(0, 48)} timezoneOffset={timezoneOffset} units={'metric'} />
        </div>

        <div style={{ width: 340 }}>
          <h4>Now</h4>
          <div>Temp: {toDisplayTemp(data.current.temp, 'metric')}</div>
          <div>Feels like: {toDisplayTemp(data.current.feels_like, 'metric')}</div>
          <div>Pressure: {data.current.pressure} hPa</div>
          <div>Dew point: {Math.round(data.current.dew_point)}°</div>
          <div>UV Index: {data.current.uvi}</div>
          <div>Visibility: {data.current.visibility} m</div>
          <div>Wind: {data.current.wind_speed} m/s ({degToCompass(data.current.wind_deg)})</div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h4>Daily (7-day)</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 8 }}>
          {data.daily.map((d: any) => (
            <div key={d.dt} style={{ border: '1px solid #eee', padding: 8, borderRadius: 6 }}>
              <div><strong>{new Date((d.dt + timezoneOffset) * 1000).toLocaleDateString()}</strong></div>
              <div>Min: {Math.round(d.temp.min)}°</div>
              <div>Max: {Math.round(d.temp.max)}°</div>
              <div>Pop: {Math.round((d.pop ?? 0) * 100)}%</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Wind (next 48h)</h4>
        <WindChart hourly={data.hourly.slice(0, 48)} timezoneOffset={timezoneOffset} />
      </div>
    </div>
  );
}
