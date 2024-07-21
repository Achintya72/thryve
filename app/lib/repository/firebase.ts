import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

console.log(process.env.API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyCgZionAhQNjib60IT3eCVFt2wma9Frs9Q",

  authDomain: "thryv-e1366.firebaseapp.com",

  projectId: "thryv-e1366",

  storageBucket: "thryv-e1366.appspot.com",

  messagingSenderId: "867292639067",

  appId: "1:867292639067:web:ac3064d63160fa3790747e",

  measurementId: "G-28K86VX2WJ"

};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);