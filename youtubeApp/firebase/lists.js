import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { arrayUnion } from "firebase/firestore";

// Obtener el usuario logueado
const getUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;  // Retorna el uid del usuario logueado o null si no hay usuario logueado
};

// Obtener todas las listas
export const fetchLists = async () => {
  const querySnapshot = await getDocs(collection(db, "lists"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Obtener las listas asociadas al usuario
export const fetchUserLists = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("No hay usuario logueado.");
    return [];
  }

  const userRef = doc(db, "llistesPerUusuari", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const listIds = userData.llistesIds || [];
    const lists = await Promise.all(
      listIds.map(async (listId) => {
        const listRef = doc(db, "lists", listId);
        const listSnap = await getDoc(listRef);

        if (listSnap.exists()) {
          return { id: listSnap.id, ...listSnap.data() };
        } else {
          console.warn(`Lista con ID ${listId} no encontrada.`);
          return null;
        }
      })
    );
    return lists.filter(list => list !== null);
  } else {
    console.log("El usuario no tiene listas asociadas.");
    return [];
  }
};

// Obtener una lista por ID
export const fetchListById = async (listId) => {
  const listDoc = doc(db, "lists", listId);
  const listSnap = await getDoc(listDoc);

  if (listSnap.exists()) {
    return { id: listSnap.id, ...listSnap.data() };
  }
  return null;
};

// Agregar una nueva lista
export const addList = async (name, description) => {
  try {
    const newList = {
      name,
      description,
      createdAt: new Date().toISOString(),
    };
    // Usar `addDoc` y `collection` del nuevo SDK
    const listRef = await addDoc(collection(db, "lists"), newList);
    return { id: listRef.id, ...newList }; // Retornamos el ID junto con los datos de la lista
  } catch (error) {
    console.error("Error creando lista:", error);
    throw error;
  }
};

export const addToUser = async (listId) => {
  const userId = getUserId();
  console.log("User ID:", userId);
  if (!userId) {
    console.error("No hay usuario logueado");
    return;
  }

  const userRef = doc(db, "llistesPerUusuari", userId);
  console.log("Documento del usuario:", userRef.path);

  try {
    await setDoc(
      userRef,
      { llistesIds: arrayUnion(listId) },
      { merge: true }
    );
    console.log("Lista agregada exitosamente al usuario");
  } catch (error) {
    console.error("Error al agregar lista al usuario:", error.message, error.stack);
  }
};

// Eliminar una lista
export const deleteList = async (listId) => {
  try {
    await deleteDoc(doc(db, "lists", listId));
  } catch (error) {
    console.error("Error eliminando lista:", error);
    throw error;
  }
};

// Actualizar una lista
export const updateList = async (listId, data) => {
  try {
    // Verificar si el campo "titulo" necesita un valor por defecto
    if (data.name === null || data.name === undefined || data.name.trim() === "") {
      data.name = "Sin titulo";
    }
    // Verificar si el campo "description" necesita un valor por defecto
    if (data.description === null || data.description === undefined || data.description.trim() === "") {
      data.description = "Sin descripción";
    }

    const listRef = doc(db, "lists", listId);
    await updateDoc(listRef, data);
  } catch (error) {
    console.error("Error actualizando lista:", error);
    throw error;
  }
};

// Función para eliminar los IDs de videos no existentes
export const removeInvalidVideoIds = async (listId) => {
  try {
    // Obtener la lista por su ID
    const listDoc = doc(db, "lists", listId);
    const listSnap = await getDoc(listDoc);

    if (!listSnap.exists()) {
      console.log("La lista no existe.");
      return;
    }

    const listData = listSnap.data();
    const currentVideoIds = listData.videoIds || [];

    // Obtener todos los documentos de videos
    const videoSnapshot = await getDocs(collection(db, "videos"));
    const validVideoIds = new Set();

    // Llenar el conjunto con los IDs de los videos existentes
    videoSnapshot.forEach((doc) => {
      validVideoIds.add(doc.id); // Añadimos solo los IDs válidos
    });

    // Filtrar los videoIds que no están en la colección de videos
    const updatedVideoIds = currentVideoIds.filter(id => validVideoIds.has(id));

    // Si hay cambios, actualizar la lista
    if (updatedVideoIds.length !== currentVideoIds.length) {
      await updateDoc(listDoc, {
        videoIds: updatedVideoIds,
      });
      console.log("Lista actualizada con los videoIds válidos.");
    } else {
      console.log("No hay cambios en los videoIds.");
    }
  } catch (error) {
    console.error("Error al actualizar los videoIds:", error);
  }
};
