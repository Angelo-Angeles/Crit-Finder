import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Paste your Firebase config object here
const firebaseConfig = { /* ... */ }; 

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Contains email, display name, and profile photo
  } catch (error) {
    console.error("Login failed:", error);
  }
};