// src/components/CityCard.tsx

import { useGetOneCallQuery } from '../api/weatherApi';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../features/favorites/favoritesSlice';
import type { RootState } from '../app/store';
import { toDisplayTemp } from '../utils/units';

export default function CityCard({ city, onOpen }: { city: { key: string; name: string; lat: number; lon: number }; onOpen: (c: any) => void }) {
  const units = useSelector((s: RootState) => s.settings.units);
  const { data, isFetching, refetch } = useGetOneCallQuery({ lat: city.lat, lon: city.lon, units });
  const dispatch = useDispatch();

  return (
    <div style={{
      border: '1px solid #ddd', padding: 12, borderRadius: 8, width: 260, margin: 8, background: '#fff'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{city.name}</h3>
        <button onClick={() => dispatch(removeFavorite(city.key))} title="Remove">✕</button>
      </div>

      {!data && isFetching && <div>Loading...</div>}
      {!data && !isFetching && <div>No data</div>}

      {data && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
            <img alt="icon" src={`https://openweathermap.org/img/wn/${data.current.weather?.[0]?.icon}@2x.png`} />
            <div style={{ marginLeft: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{toDisplayTemp(data.current.temp, units)}</div>
              <div>{data.current.weather?.[0]?.main} — {data.current.weather?.[0]?.description}</div>
            </div>
          </div>

          <div style={{ marginTop: 8, fontSize: 13 }}>
            <div>Humidity: {data.current.humidity}%</div>
            <div>Wind: {Math.round(data.current.wind_speed)} {units === 'metric' ? 'm/s' : 'mph'}</div>
            <div>Last update: {new Date().toLocaleTimeString()}</div>
          </div>

          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <button onClick={() => onOpen({ city, data })}>Details</button>
            <button onClick={() => refetch()}>Refresh</button>
          </div>
        </>
      )}
    </div>
  );
}
