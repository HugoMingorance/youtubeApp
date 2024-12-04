import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import FSection from "../FSection";
import { fetchLists } from "../../firebase/lists.js"; // Asegúrate de que esta ruta sea correcta.

export default function AllListsScreen({ navigation }) {
  const [lists, setLists] = useState([]); // Estado para almacenar las listas

  // Cargar las listas desde Firestore
  useEffect(() => {
    const loadLists = async () => {
      try {
        const fetchedLists = await fetchLists(); // Llama a la función fetchLists desde lists.js
        setLists(fetchedLists); // Actualiza el estado con las listas obtenidas
      } catch (error) {
        console.error("Error fetching lists: ", error);
      }
    };

    loadLists();
  }, []);

  // Maneja la navegación al hacer clic en una lista
  const handleListPress = (listId) => {
    navigation.navigate("ListScreen", { listId }); // Navega a la pantalla de videos con el ID de la lista
  };

  const handlePress = (id) => {
    console.log("Han clicat al botó " + id);
    if (id === 1) {
      navigation.navigate("mapScreen");
    } else if (id === 2) {
      navigation.navigate("FavouritesScreen");
    } else if (id === 3) {
      navigation.navigate("userScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9, justifyContent: "center", alignItems: "center", width: "100%" }}>
        {/* Muestra las listas con un FlatList */}
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id} // Usa el ID de cada lista como clave
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleListPress(item.id)}>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>{item.name}</Text>
                <Text style={styles.listDescription}>{item.description || "Sin descripción"}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No hay listas disponibles.</Text>} // Muestra esto si no hay listas
        />
        <StatusBar style="auto" />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 0 }}>
        <FSection currentSection={1} onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "90%",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listDescription: {
    fontSize: 14,
    color: "#555",
  },
});
