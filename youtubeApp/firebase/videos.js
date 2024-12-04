import { doc, getDoc } from "firebase/firestore";
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
