// src/components/SearchBar.tsx
import  { useState, useEffect } from 'react';
import { useGeocodeQuery } from '../api/weatherApi';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../features/favorites/favoritesSlice';

function keyFor(lat: number, lon: number) {
  return `${lat.toFixed(4)}_${lon.toFixed(4)}`;
}

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 350);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isFetching } = useGeocodeQuery(debounced, { skip: debounced.length < 2 });
  const dispatch = useDispatch();

  const handleAdd = (item: any) => {
    const lat = item.lat;
    const lon = item.lon;
    const fav = {
      key: keyFor(lat, lon),
      name: `${item.name}${item.state ? ', ' + item.state : ''}${item.country ? ', ' + item.country : ''}`,
      lat,
      lon,
    };
    dispatch(addFavorite(fav));
    setQ('');
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search city (type at least 2 chars)..."
        style={{ padding: '8px 12px', width: '100%', boxSizing: 'border-box' }}
      />
      {isFetching && <div>Searching…</div>}
      {!isFetching && data && data.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #ddd', marginTop: 6 }}>
          {data.map((item: any) => (
            <div key={`${item.lat}_${item.lon}`} style={{ padding: 8, cursor: 'pointer' }} onClick={() => handleAdd(item)}>
              <strong>{item.name}</strong> {item.state ? `, ${item.state}` : ''} <small>({item.country})</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
