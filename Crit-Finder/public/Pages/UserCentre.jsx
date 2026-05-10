const UserCenter = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <div className="flex items-center gap-6 mb-12 border-b border-[var(--secondary)] pb-8">
      <div className="w-24 h-24 bg-[var(--gold)] rounded-full flex items-center justify-center text-4xl border-4 border-[var(--accent)]">🧙‍♂️</div>
      <div>
        <h2 className="text-3xl font-bold">Elminster the Wise</h2>
        <p className="text-[var(--secondary)]">Level 12 Wizard | 4 Active Campaigns</p>
      </div>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white/5 p-6 rounded-lg border border-[var(--secondary)]">
        <h3 className="font-bold mb-4 border-b border-[var(--secondary)]">Active Campaigns</h3>
        <ul className="space-y-3">
          <li>🎲 The Shattered Obelisk - <span className="text-[var(--gold)]">Next Session: Friday</span></li>
          <li>🎲 Dragons of Icespire - <span className="text-[var(--gold)]">Paused</span></li>
        </ul>
      </div>
      <div className="bg-white/5 p-6 rounded-lg border border-[var(--secondary)]">
        <h3 className="font-bold mb-4 border-b border-[var(--secondary)]">Character Stats</h3>
        <p className="text-sm">Quick access to your primary stats via 5e API.</p>
        <button className="mt-4 text-[var(--accent)] font-bold underline">Edit Character Sheet</button>
      </div>
    </div>
  </div>
);