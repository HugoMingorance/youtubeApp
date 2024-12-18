import React, { useEffect, useState } from "react";  
import { View, FlatList, Text, StyleSheet } from "react-native";
import VideoCard from "../VideoCard.js";  // Componente para mostrar cada video
import { fetchVideosByIds } from "../../firebase/videos";  // Función para obtener videos por sus IDs
import { doc, getDoc } from "firebase/firestore";  // Firebase para obtener la colección de favoritos
import { db } from "../../firebase/firebaseConfig";  // Configuración de Firebase
import { getAuth } from "firebase/auth"; // Para obtener la autenticación del usuario
import FSection from "../FSection";  // Footer (se asume que tienes un componente FSection)
import Hsection from "../Hsection";  // Header (se asume que tienes un componente Hsection)

export default function FavoritsScreen({ navigation }) {
  const [videos, setVideos] = useState([]); // Estado para los videos favoritos

  useEffect(() => {
    const loadVideos = async () => {
      try {
        // Obtener el usuario logueado
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          // Obtener el documento de la colección "favorits" del usuario logueado usando su ID
          const docRef = doc(db, "favorits", user.uid); // Usamos el UID del usuario logueado
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Obtener los videoIds de favoritos
            const videoIds = docSnap.data().videoIds;

            if (videoIds && videoIds.length > 0) {
              // Cargar los videos correspondientes por sus videoIds
              const fetchedVideos = await fetchVideosByIds(videoIds);
              setVideos(fetchedVideos); // Actualiza el estado con los videos obtenidos
            } else {
              console.log("No hay videos en favoritos.");
              setVideos([]); // Si no hay videos, limpiamos el estado
            }
          } else {
            console.log("No se encontró el documento de favoritos.");
          }
        } else {
          console.log("No hay usuario logueado.");
        }
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    };

    loadVideos();
  }, []); // Solo se ejecuta al cargar la pantalla

  const handlePress = (id) => {
    if (id === 1) {
      navigation.navigate("allListsScreen");
    } else if (id === 2) {
      navigation.navigate("FavoritsScreen");
    } else if (id === 3) {
      navigation.navigate("userScreen");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Header */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Hsection />
      </View>

      {/* Contenido - Lista de videos */}
      <View style={{ flex: 8, justifyContent: "center", alignItems: "center", width: "100%" }}>
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VideoCard item={item} />}
          ListEmptyComponent={<Text style={{ color: 'white' }}>No hay videos en favoritos.</Text>}
        />
      </View>

      {/* Footer */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FSection currentSection={2} onPress={handlePress} />
      </View>
    </View>
  );
}
