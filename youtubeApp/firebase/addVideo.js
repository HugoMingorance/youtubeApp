// addVideo.js
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Usa el SDK Web de Firebase

import { db } from './firebaseConfig'; // Usa la configuración de Firebase Web

export const addVideo = async (videoData) => {
  try {
    // Agregar un nuevo documento a la colección 'videos'
    await addDoc(collection(db, 'videos'), videoData); // Datos que quieres agregar

    console.log('Video agregado correctamente');
  } catch (error) {
    console.error('Error al agregar video a Firestore: ', error);
  }
};
