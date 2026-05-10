const CampaignFinder = () => {
  const [games] = useState([
    { id: 1, title: "Curse of Strahd", level: "1-10", slots: "2/5", tag: "Horror" },
    { id: 2, title: "Waterdeep Heist", level: "3", slots: "4/4", tag: "Urban" },
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="dnd-font text-4xl mb-8">Available Campaigns</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className="p-6 border-2 border-[var(--secondary)] rounded-lg bg-[var(--base)] hover:scale-105 transition shadow-md">
            <div className="text-[var(--gold)] font-bold mb-2 uppercase text-xs tracking-widest">{game.tag}</div>
            <h3 className="text-2xl font-bold mb-4">{game.title}</h3>
            <div className="flex justify-between text-sm mb-4">
              <span>Level: {game.level}</span>
              <span className="text-[var(--accent)] font-bold">{game.slots} Slots</span>
            </div>
            <button className="w-full py-2 bg-[var(--secondary)] text-white rounded font-bold">Request to Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};