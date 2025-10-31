
/// src/pages/Home.tsx
import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🌦️ Weather Analytics Dashboard
      </h1>
      <Dashboard />
    </main>
  );
};

export default Home;
