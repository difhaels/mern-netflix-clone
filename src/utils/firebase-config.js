
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBRzSRDUcsLJNFY9urE4d1VbALRRXyApU",
  authDomain: "react-netflix-clone-27f08.firebaseapp.com",
  projectId: "react-netflix-clone-27f08",
  storageBucket: "react-netflix-clone-27f08.appspot.com",
  messagingSenderId: "1083137392179",
  appId: "1:1083137392179:web:54cff9ff9f065162516d46",
  measurementId: "G-EFJHBK59LG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);