import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Image } from "react-native";
import FSection from "../FSection";
import YoutubePlayer from "react-native-youtube-iframe"; // Para videos de YouTube
import { fetchListById } from "../../firebase/lists"; 
import { fetchVideosByIds } from "../../firebase/videos";

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
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id} // Usa el ID del video como clave
          renderItem={({ item }) => (
            <View style={styles.videoCard}>
              {/* Muestra la previsualización del video */}
              {item.type === "youtube" ? (
                <YoutubePlayer
                  height={200}
                  play={false}
                  videoId={item.url.split("v=")[1]} // Obtiene el ID del video de YouTube
                />
              ) : (
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <Image
                    source={{ uri: item.thumbnail || "https://via.placeholder.com/300" }} // Placeholder si no hay thumbnail
                    style={styles.thumbnail}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{item.title}</Text>
                <Text style={styles.videoDescription}>{item.description}</Text>
              </View>
            </View>
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
  videoCard: {
    width: "90%",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  videoInfo: {
    marginTop: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  videoDescription: {
    fontSize: 14,
    color: "#555",
  },
});
