// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD47HF5e3QFXda48q6LRYAf0rfjCEE89FM",
  authDomain: "levelzsm.firebaseapp.com",
  projectId: "levelzsm",
  storageBucket: "levelzsm.appspot.com",
  messagingSenderId: "152277712017",
  appId: "1:152277712017:web:2f0a9eaa4cc71145661330",
  measurementId: "G-YXKL50D91Z"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Set up Firestore, Auth, Analytics
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
