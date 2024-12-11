// ListScreen.js

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, Text } from "react-native";
import VideoCard from "../VideoCard.js"; // Importamos el componente VideoCard
import { fetchListById } from "../../firebase/lists";
import { fetchVideosByIds } from "../../firebase/videos";
import FSection from "../FSection";
import Hsection from "../Hsection";

export default function ListScreen({ route, navigation }) {
  const { listId } = route.params; // Obtiene el ID de la lista desde los parámetros de navegación
  const [videos, setVideos] = useState([]); // Estado para almacenar los videos
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

  return (
    <View style={{ flex: 1, backgroundColor: 'black'}}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 0 }}>
        <Hsection /> 
      </View>
      <View style={{ flex: 8, justifyContent: "center", alignItems: "center", width: "100%" }}>
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id} // Usa el ID del video como clave
          renderItem={({ item }) => <VideoCard item={item} />} // Usamos el componente VideoCard
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
