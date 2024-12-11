import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe"; // Para videos de YouTube
import { Linking } from "react-native";

// Función para extraer el videoId de la URL de YouTube
const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function VideoCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false); // Estado para manejar la expansión del video

  // Función para alternar la visibilidad del video o la previsualización
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Extrae el videoId usando la función
  const videoId = extractVideoId(item.url);

  // URL de la miniatura del video de YouTube
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <View style={styles.videoCard}>
      <View style={styles.videoInfo}>
        {/* Título y descripción del video */}
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoDescription}>{item.description}</Text>
      </View>

      {/* <View>
      Miniatura del video 
      {thumbnailUrl && (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        )}
      </View>*/}

      {/* Botón desplegable */}
      <TouchableOpacity onPress={toggleExpansion} style={styles.expandButton}>
        <Text style={styles.expandButtonText}>
          {isExpanded ? "v" : ">"}
        </Text>
      </TouchableOpacity>

      {/* Mostrar video o previsualización dependiendo del estado */}
      {isExpanded && (
        <View style={styles.videoPreview}>
          {videoId ? (
            <YoutubePlayer
              height={200}
              play={false}
              videoId={videoId} // Usa el videoId extraído
            />
          ) : (
            <Text>Video no disponible</Text> // Si no se encuentra un videoId válido
          )}
        </View>
      )}
      <Text style={styles.fecha}>{item.createdAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  videoCard: {
    width: "97%",
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 15,
    alignSelf: "center",
  },
  videoInfo: {
    marginBottom: 10,
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
  fecha: {
    fontSize: 14,
    color: "#555",
    textAlign: "right",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  expandButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  expandButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  videoPreview: {
    marginTop: 10,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
