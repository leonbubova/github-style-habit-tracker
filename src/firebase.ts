import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHpQpS4i5Jk7F7hTJ-jyzGwEHmb7EwcfA",
  authDomain: "github-style-habit-tracker.firebaseapp.com",
  projectId: "github-style-habit-tracker",
  storageBucket: "github-style-habit-tracker.appspot.com",
  messagingSenderId: "448867754074",
  appId: "1:448867754074:web:6619784b746321199e3863",
  measurementId: "G-VSN04ZBJ8L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
