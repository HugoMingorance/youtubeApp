import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Obtener los videos por una lista de IDs
export const fetchVideosByIds = async (videoIds) => {
  const videoPromises = videoIds.map(async (videoId) => {
    const videoDoc = doc(db, "videos", videoId); // Obtener referencia del documento usando el videoId
    const videoSnap = await getDoc(videoDoc);

    // Verificar si el documento existe
    if (videoSnap.exists()) {
      return { id: videoSnap.id, ...videoSnap.data() };  // Si existe, devolvemos los datos del video
    } else {
      console.warn(`Video con ID ${videoId} no encontrado.`);  // Avisar si no se encuentra el video
      return null;  // Si no existe, devolver null para poder manejarlo más tarde
    }
  });

  const videos = await Promise.all(videoPromises);

  // Filtrar los nulos (si algún video no se encontró)
  return videos.filter((video) => video !== null);
};

// Elimina un video específico de Firestore
export const removeVideo = async (videoId) => {
  try {
    // Asegurarse de que videoId es el correcto antes de intentar eliminarlo
    if (!videoId) {
      console.error("No se proporcionó un videoId válido.");
      return;
    }

    const videoRef = doc(db, "videos", videoId);  // Usar db para la referencia correcta del video
    await deleteDoc(videoRef);  // Eliminar el documento (video) con el ID proporcionado

    console.log("Video eliminado exitosamente");
  } catch (error) {
    console.error("Error eliminando video: ", error);  // Mostrar error si algo sale mal
  }
};
