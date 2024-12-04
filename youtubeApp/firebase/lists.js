import { collection, doc, getDocs, getDoc } from "firebase/firestore";
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
