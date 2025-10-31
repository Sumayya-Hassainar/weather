// src/components/SettingsModal.tsx

import { useSelector, useDispatch } from 'react-redux';
import { setUnits, setPolling } from '../features/settings/settingsSlice';
import type { RootState } from '../app/store';


export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const settings = useSelector((s: RootState) => s.settings);
  const dispatch = useDispatch();

  return (
    <div style={{
      position: 'fixed', left: '30%', top: '25%', width: '40%', background: '#fff', padding: 16, border: '1px solid #ddd', zIndex: 3000
    }}>
      <h3>Settings</h3>
      <div>
        <label>
          Units:
          <select value={settings.units} onChange={(e) => dispatch(setUnits(e.target.value as any))}>
            <option value="metric">Celsius (metric)</option>
            <option value="imperial">Fahrenheit (imperial)</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: 8 }}>
        <label>
          Polling (seconds):
          <input type="number" value={settings.pollingSeconds} min={10} max={3600}
            onChange={(e) => dispatch(setPolling(Number(e.target.value)))} />
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
