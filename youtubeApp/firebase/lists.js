import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import firebase from "firebase/app";
import 'firebase/firestore'; 

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

export const addList = async (name) => {
    try {
      const newList = {
        name,
        createdAt: new Date().toISOString(),
      };
      const listRef = await firebase.firestore().collection('lists').add(newList);
      return { id: listRef.id, ...newList }; // Retornamos el ID junto con los datos de la lista
    } catch (error) {
      console.error("Error creando lista:", error);
      throw error;
    }
  };
  
