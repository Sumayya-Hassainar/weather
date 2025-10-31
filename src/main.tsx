// src/index.tsx

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './pages/Home'
import './App.css'
const App = () => (
  <Provider store={store}>
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f7f7f8', minHeight: '100vh', padding: 20 }}>
     <Home/>
    </div>
  </Provider>
);

const el = document.getElementById('root');
if (!el) throw new Error('Root element not found');
createRoot(el).render(<App />);
