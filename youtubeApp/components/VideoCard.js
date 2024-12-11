import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe"; // Para videos de YouTube

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
        {/* Contenedor con thumbnail y texto en fila */}
        <View style={styles.thumbnailContainer}>
          {/* Miniatura del video */}
          {thumbnailUrl && (
            <Image
              source={{ uri: thumbnailUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          )}

          {/* Título y descripción */}
          <View style={styles.textContainer}>
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.videoDescription}>{item.description}</Text>
          </View>
        </View>
      </View>

      {/* Botón desplegable */}
      <TouchableOpacity onPress={toggleExpansion} style={styles.expandButton}>
        <Text style={styles.expandButtonText}>{isExpanded ? "v" : ">"}</Text>
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
  thumbnailContainer: {
    flexDirection: "row", // Coloca el thumbnail y el texto en una fila
    alignItems: "center", // Alinea verticalmente el thumbnail y el texto
  },
  thumbnail: {
    width: 100,
    height: 70,
    borderRadius: 10,
    marginRight: 10, 
  },
  textContainer: {
    flex: 1, // Permite que el texto ocupe el resto del espacio disponible
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
    textAlign: "center",
  },
  expandButton: {
    marginTop: 10,
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  expandButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  videoPreview: {
    marginTop: 10,
  },
});
