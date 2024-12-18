import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Obtener los videos por una lista de IDs
export const fetchVideosByIds = async (videoIds) => {
  const videoPromises = videoIds.map(async (videoId) => {
    const videoDoc = doc(db, "videos", videoId);
    const videoSnap = await getDoc(videoDoc);
    return { id: videoSnap.id, ...videoSnap.data() };
  });

  return Promise.all(videoPromises);
};

// Elimina un video específico de Firestore
export const removeVideo = async (videoId) => {
  try {
    const videoRef = doc(db, "videos", videoId);  // Usa db en lugar de firestore
    await deleteDoc(videoRef);  // Elimina el documento (video) con el ID proporcionado
    console.log("Video eliminado exitosamente");
  } catch (error) {
    console.error("Error eliminando video: ", error);
  }
};


