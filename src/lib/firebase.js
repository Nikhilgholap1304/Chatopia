// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);