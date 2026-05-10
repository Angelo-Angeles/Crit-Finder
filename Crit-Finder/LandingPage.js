import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="dnd-font text-6xl mb-6 font-bold tracking-wide">Adventure Awaits.</h1>
      <p className="max-w-xl text-lg mb-8 opacity-80">
        Stop fighting your calendar and start fighting dragons. The premier D&D session organizer.
      </p>
      
      <div className="flex gap-4 justify-center">
        <Link 
          to="/find" 
          className="bg-[var(--accent)] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition shadow-lg"
        >
          Start Searching
        </Link>
        <button className="border-2 border-[var(--secondary)] px-8 py-3 rounded-lg font-bold hover:bg-white/5 transition">
          Host a Game
        </button>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="p-6 border border-[var(--secondary)] rounded-xl bg-white/5 shadow-sm">
          <span className="text-4xl block mb-2">⚔️</span>
          <h3 className="font-bold text-xl my-1">Verified DMs</h3>
          <p className="text-sm opacity-75 mt-2">Find reliable game masters with verified attendance records.</p>
        </div>
        <div className="p-6 border border-[var(--secondary)] rounded-xl bg-white/5 shadow-sm">
          <span className="text-4xl block mb-2">🛡️</span>
          <h3 className="font-bold text-xl my-1">5e API Integration</h3>
          <p className="text-sm opacity-75 mt-2">Pull your official class, race, and spell stats directly.</p>
        </div>
        <div className="p-6 border border-[var(--secondary)] rounded-xl bg-white/5 shadow-sm">
          <span className="text-4xl block mb-2">📅</span>
          <h3 className="font-bold text-xl my-1">Smart Scheduling</h3>
          <p className="text-sm opacity-75 mt-2">Sync party availability instantly to avoid campaign death.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;