import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"; // Usar funciones modernas
import { db } from "./firebaseConfig";

// Obtener todas las listas
export const fetchLists = async () => {
  const querySnapshot = await getDocs(collection(db, "lists"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
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
