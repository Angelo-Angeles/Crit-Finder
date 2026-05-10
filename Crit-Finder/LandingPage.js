const LandingPage = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <h1 className="dnd-font text-6xl mb-6">Adventure Awaits.</h1>
    <p className="max-w-xl text-lg mb-8 opacity-80">Stop fighting your calendar and start fighting dragons. The premier D&D session organizer.</p>
    <div className="flex gap-4">
      <Link to="/find" className="bg-[var(--accent)] text-white px-8 py-3 rounded-lg font-bold">Start Searching</Link>
      <button className="border-2 border-[var(--secondary)] px-8 py-3 rounded-lg">Host a Game</button>
    </div>
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
      <div className="p-6 border border-[var(--secondary)] rounded-xl">
        <span className="text-4xl">⚔️</span>
        <h3 className="font-bold my-2">Verified DMs</h3>
      </div>
      {/* Add more feature cards here */}
    </div>
  </div>
);