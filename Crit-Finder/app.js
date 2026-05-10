import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import CampaignFinder from './pages/CampaignFinder';
import UserCenter from './pages/UserCenter';

function App() {
  const [theme, setTheme] = useState('tavern');

  return (
    <Router>
      <div data-theme={theme} className="min-h-screen">
        {/* SHARED NAVIGATION BAR */}
        <nav className="p-4 border-b border-[var(--secondary)] flex justify-between bg-[var(--base)] sticky top-0 z-50">
          <Link to="/" className="dnd-font text-2xl font-bold text-[var(--accent)]">CRITFINDER</Link>
          <div className="space-x-6 flex items-center">
            <Link to="/find" className="hover:text-[var(--gold)]">Find Games</Link>
            <Link to="/profile" className="hover:text-[var(--gold)]">My Character</Link>
            <button onClick={() => setTheme(theme === 'tavern' ? 'dungeon' : 'tavern')} className="text-xl">
              {theme === 'tavern' ? '🌙' : '☀️'}
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/find" element={<CampaignFinder />} />
          <Route path="/profile" element={<UserCenter />} />
        </Routes>
      </div>
    </Router>
  );
}