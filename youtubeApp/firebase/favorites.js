import { db } from "./firebaseConfig";  
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Obtener el usuario logueado
const getUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;  // Retorna el uid del usuario logueado o null si no hay usuario logueado
};

// Agregar a favoritos
export const addToFavorites = async (videoId) => {
  const userId = getUserId();
  if (!userId) {
    console.error("No hay usuario logueado");
    return;
  }

  const userRef = doc(db, "favorits", userId);  // Usar el uid del usuario logueado
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
  const userId = getUserId();
  if (!userId) {
    console.error("No hay usuario logueado");
    return;
  }

  const userRef = doc(db, "favorits", userId);  // Usar el uid del usuario logueado
  try {
    await updateDoc(userRef, {
      videoIds: arrayRemove(videoId)  // Eliminar el videoId del array de videoIds
    });
  } catch (error) {
    console.error("Error al eliminar video de favoritos: ", error);
  }
};
