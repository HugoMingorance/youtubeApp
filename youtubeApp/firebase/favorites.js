// favorites.js
import { db } from "./firebaseConfig";  
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Agregar a favoritos
export const addToFavorites = async (videoId) => {
  const userRef = doc(db, "favorits", "oB42KteECpt93uy4h3CP");  // Reemplaza con el ID correcto de usuario
  try {
    await updateDoc(userRef, {
      videoIds: arrayUnion(videoId)  // Agregar el videoId al array de videoIds
    });
  } catch (error) {
    console.error("Error al agregar video a favoritos: ", error);
  }
};

// Quitar de favoritos
export const removeFromFavorites = async (videoId) => {
  const userRef = doc(db, "favorits", "oB42KteECpt93uy4h3CP");  // Reemplaza con el ID correcto de usuario
  try {
    await updateDoc(userRef, {
      videoIds: arrayRemove(videoId)  // Eliminar el videoId del array de videoIds
    });
  } catch (error) {
    console.error("Error al eliminar video de favoritos: ", error);
  }
};
