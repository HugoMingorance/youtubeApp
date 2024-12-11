// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebase from "firebase/app";
import 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyCb8cazagtFJeTeZHji6ofnBynCPj-OY84",
  authDomain: "andinstagramvideos.firebaseapp.com",
  projectId: "andinstagramvideos",
  storageBucket: "andinstagramvideos.firebasestorage.app",
  messagingSenderId: "983569613180",
  appId: "1:983569613180:web:696b4b677cda06787d24f9",
  measurementId: "G-1BZR64P4XG"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth, Firestore y Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
