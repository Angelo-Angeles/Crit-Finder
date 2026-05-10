import { useState, useEffect } from 'react';
import { auth, db, loginWithGoogle, logoutUser } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UserCenter = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  
  // Editable form state
  const [charClass, setCharClass] = useState('');
  const [charLevel, setCharLevel] = useState(1);

  // Monitor login state and fetch Firestore data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData(data);
          setCharClass(data.characterClass || 'Fighter');
          setCharLevel(data.level || 1);
        }
      } else {
        setProfileData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Write changes back to Firestore Database
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      characterClass: charClass,
      level: Number(charLevel)
    });
    setProfileData(prev => ({ ...prev, characterClass: charClass, level: Number(charLevel) }));
    setEditing(false);
  };

  if (loading) {
    return <div className="p-8 text-center text-xl">Summoning profile records...</div>;
  }

  // NOT LOGGED IN VIEW
  if (!user) {
    return (
      <div className="p-8 max-w-md mx-auto text-center bg-white/5 border-2 border-[var(--secondary)] rounded-xl mt-12 shadow-lg">
        <h2 className="dnd-font text-3xl mb-4 font-bold">Tavern Registry</h2>
        <p className="mb-6 opacity-80 text-sm">Sign in with Google to sync your character sheet, save campaigns, and verify your availability.</p>
        <button 
          onClick={loginWithGoogle}
          className="w-full py-3 bg-[var(--accent)] text-white font-bold rounded-lg hover:opacity-90 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>📜</span> Authenticate with Google
        </button>
      </div>
    );
  }

  // LOGGED IN VIEW
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-[var(--secondary)] pb-8">
        <div className="flex items-center gap-6">
          <img 
            src={user.photoURL || "https://placehold.co/100"} 
            alt="Avatar" 
            className="w-20 h-20 rounded-full border-2 border-[var(--gold)] shadow"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="text-3xl font-bold">{user.displayName}</h2>
            <p className="text-[var(--secondary)] font-semibold mt-1">
              Level {profileData?.level || 1} {profileData?.characterClass || 'Adventurer'}
            </p>
            <p className="text-xs opacity-60 mt-1">{user.email}</p>
          </div>
        </div>
        
        <button 
          onClick={logoutUser} 
          className="border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded font-bold hover:bg-[var(--accent)] hover:text-white transition cursor-pointer text-sm"
        >
          Depart Tavern (Logout)
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Active Campaigns List */}
        <div className="bg-white/5 p-6 rounded-lg border border-[var(--secondary)] shadow-sm">
          <h3 className="font-bold mb-4 border-b border-[var(--secondary)] pb-2 text-lg">Saved Campaigns</h3>
          {profileData?.activeCampaigns && profileData.activeCampaigns.length > 0 ? (
            <ul className="space-y-3">
              {profileData.activeCampaigns.map((game, idx) => (
                <li key={idx}>🎲 {game}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-70 italic">No campaigns joined yet. Head to the Finder to enroll!</p>
          )}
        </div>

        {/* Database Editable Stats */}
        <div className="bg-white/5 p-6 rounded-lg border border-[var(--secondary)] shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-[var(--secondary)] pb-2">
            <h3 className="font-bold text-lg">Character Metadata</h3>
            {!editing && (
              <button onClick={() => setEditing(true)} className="text-[var(--accent)] text-sm font-bold underline cursor-pointer">
                Edit Sheet
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Primary Class</label>
                <input 
                  type="text" 
                  value={charClass} 
                  onChange={(e) => setCharClass(e.target.value)}
                  className="w-full p-2 rounded bg-black/20 border border-[var(--secondary)] text-white font-semibold"
                  placeholder="e.g. Paladin, Wizard" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Character Level</label>
                <input 
                  type="number" 
                  min="1" 
                  max="20"
                  value={charLevel} 
                  onChange={(e) => setCharLevel(e.target.value)}
                  className="w-full p-2 rounded bg-black/20 border border-[var(--secondary)] text-white font-semibold" 
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="bg-[var(--accent)] text-white px-4 py-1.5 rounded font-bold text-sm cursor-pointer">Save to Database</button>
                <button type="button" onClick={() => setEditing(false)} className="px-4 py-1.5 rounded border border-[var(--secondary)] text-sm cursor-pointer">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <p className="text-sm"><strong className="text-[var(--gold)]">Class:</strong> {profileData?.characterClass || 'None'}</p>
              <p className="text-sm"><strong className="text-[var(--gold)]">Level:</strong> {profileData?.level || 1}</p>
              <p className="text-xs opacity-60 mt-4 block">Synced directly with secure Firestore Database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCenter;