import { getDoc, doc, updateDoc, arrayUnion, addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addVideo = async (videoData) => {
  try {
    const videoRef = await addDoc(collection(db, 'videos'), videoData);
    const videoId = videoRef.id;

    console.log('Video agregado correctamente con ID:', videoId);

    const { lists } = videoData;
    if (lists && lists.length > 0) {
      for (const listId of lists) {
        const listRef = doc(db, 'lists', listId);

        // Validar si el documento existe
        const listDoc = await getDoc(listRef);
        if (listDoc.exists()) {
          await updateDoc(listRef, {
            videoIds: arrayUnion(videoId),
          });
          console.log(`Video ID ${videoId} agregado a la lista ${listId}`);
        } else {
          console.warn(`La lista con ID ${listId} no existe. No se puede actualizar.`);
        }
      }
    }

    return videoId;
  } catch (error) {
    console.error('Error al agregar video o actualizar listas: ', error);
    throw error;
  }
};
