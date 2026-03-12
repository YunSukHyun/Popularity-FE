import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const logout = () => {
  signOut(auth).catch(console.error);
};

export const onUserStateChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, async (user) => {
    callback(user);
    if (user !== null && user.email) {
      const userId = user.email.split("@")[0];
      const userRef = await getDoc(doc(db, "users", userId));
      sessionStorage.setItem("user", userId);
      if (!userRef.exists()) {
        await setDoc(doc(db, "users", userId), {
          genshin: false,
          priconne: false,
        });
      }
    } else {
      sessionStorage.removeItem("user");
    }
  });
};
