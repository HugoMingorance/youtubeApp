// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBPBv83DyVUabG3cZueiUn5V09Olvlegao",
  authDomain: "todoplease-136ed.firebaseapp.com",
  projectId: "todoplease-136ed",
  storageBucket: "todoplease-136ed.appspot.com",
  messagingSenderId: "695433277657",
  appId: "1:695433277657:web:6e1e0512579492586e8ec8" // Reemplaza con tu App ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth, Firestore y Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
