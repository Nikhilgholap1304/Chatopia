import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatopia-1304.firebaseapp.com",
  projectId: "chatopia-1304",
  storageBucket: "chatopia-1304.appspot.com",
  messagingSenderId: "125963862998",
  appId: "1:125963862998:web:97fbee4338259524e45a77",
  measurementId: "G-4DE1T7XX0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);


export {auth, provider};