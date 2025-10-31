// src/components/Dashboard.tsx
import  { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import CityCard from './CityCard';
import CityDetail from './CityDetail';
import SearchBar from './SearchBar';
import SettingsModal from './SettingsModal';

export default function Dashboard() {
  const favs = useSelector((s: RootState) => s.favorites);
  const settings = useSelector((s: RootState) => s.settings);
  const [detail, setDetail] = useState<{ city: any; data: any } | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h1>Weather Dashboard</h1>
        <div>
          <button onClick={() => setShowSettings(true)}>Settings</button>
        </div>
      </div>

      <SearchBar />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {favs.length === 0 && <div>No favorites yet — search and add a city.</div>}
        {favs.map((c) => (
          <CityCard key={c.key} city={c} onOpen={({ city, data }: any) => setDetail({ city, data })} />
        ))}
      </div>

      {detail && <CityDetail city={detail.city} data={detail.data} onClose={() => setDetail(null)} />}

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      <div style={{ marginTop: 20, color: '#666', fontSize: 13 }}>
        <div>Units: {settings.units} • Polling: {settings.pollingSeconds}s</div>
      </div>
    </div>
  );
}
