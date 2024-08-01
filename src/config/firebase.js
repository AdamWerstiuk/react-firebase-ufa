import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXG-5Hu6q3LnqO8S5xKdTDwcQpuNJXX-Q",
  authDomain: "playground-f2ac9.firebaseapp.com",
  projectId: "playground-f2ac9",
  storageBucket: "playground-f2ac9.appspot.com",
  messagingSenderId: "615597557155",
  appId: "1:615597557155:web:29e3734e63797a516f0616",
  measurementId: "G-26L5P68MNE"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);