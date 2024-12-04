import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking } from "react-native";
import FSection from "../FSection";
import { fetchListById } from "../../firebase/lists"; // Función para obtener la lista por ID
import { fetchVideosByIds } from "../../firebase/videos"; // Función para obtener los videos por IDs

export default function ListScreen({ route, navigation }) {
  const { listId } = route.params; // Obtiene el ID de la lista desde los parámetros de navegación
  const [videos, setVideos] = useState([]); // Estado para almacenar los videos

  // Cargar los videos de la lista
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const list = await fetchListById(listId); // Obtén los datos de la lista desde Firestore
        if (list) {
          const fetchedVideos = await fetchVideosByIds(list.videoIds); // Carga los videos por sus IDs
          setVideos(fetchedVideos); // Actualiza el estado con los videos
        }
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    };

    loadVideos();
  }, [listId]);

  const handlePress = (id) => {
    console.log("Han clicat al botó " + id);
    if (id === 1) {
      navigation.navigate("allListsScreen");
    } else if (id === 2) {
      navigation.navigate("FavouritesScreen");
    } else if (id === 3) {
      navigation.navigate("userScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9, justifyContent: "center", alignItems: "center", width: "100%" }}>
        {/* Muestra los videos de la lista */}
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id} // Usa el ID del video como clave
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <View style={styles.videoItem}>
                <Text style={styles.videoTitle}>{item.title}</Text>
                <Text style={styles.videoPlatform}>
                  {item.type === "youtube" ? "YouTube" : "Instagram"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No hay videos en esta lista.</Text>} // Muestra esto si no hay videos
        />
        <StatusBar style="auto" />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 0 }}>
        <FSection currentSection={4} onPress={handlePress} />
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
  videoItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "90%",
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  videoPlatform: {
    fontSize: 14,
    color: "#555",
  },
});
