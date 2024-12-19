import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import FSection from "../FSection";
import Hsection from "../Hsection.js";
import { fetchUserLists } from "../../firebase/lists.js"; // Asegúrate de que esta ruta sea correcta.
import ListCard from "../ListCard"; // Importa el nuevo componente ListCard

export default function AllListsScreen({ navigation }) {
  const [lists, setLists] = useState([]); // Estado para almacenar las listas

  /// Define loadLists fuera del useEffect para que esté disponible en toda la función
  const loadLists = async () => {
    try {
      const fetchedLists = await fetchLists(); // Llama a la función fetchLists desde lists.js
      setLists(fetchedLists); // Actualiza el estado con las listas obtenidas
    } catch (error) {
      console.error("Error fetching lists: ", error);
    }
  };

  useEffect(() => {
    const loadUserLists = async () => {
      try {
        const lists = await fetchUserLists();  // Solo las listas del usuario
        setLists(lists);
      } catch (error) {
        console.error("Error fetching user lists: ", error);
      }
    };
    loadUserLists();
  }, []);

  // Maneja la navegación al hacer clic en una lista
  const handleListPress = (listId) => {
    navigation.navigate("ListScreen", { listId }); // Navega a la pantalla de listas con el ID de la lista
  };

  const handlePress = (id) => {
    console.log("Han clicat al botó " + id);
    if (id === 1) {
      navigation.navigate("NewVideoScreen");
    } else if (id === 2) {
      navigation.navigate("FavoritsScreen");
    } else if (id === 3) {
      navigation.navigate("UserScreen");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black'}}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 0 }}>
        <Hsection /> 
      </View>
      <View style={{ flex: 8, justifyContent: "center", alignItems: "center", width: "100%" }}>
        {/* Muestra las listas con un FlatList */}
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id} // Usa el ID de cada lista como clave
          renderItem={({ item }) => (
            <ListCard
            list={item}
            onPress={handleListPress}
            onUpdate={loadLists} // Pasa la función de actualización al componente hijo
          />
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
