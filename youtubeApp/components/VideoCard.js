import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe"; // Para videos de YouTube
import { WebView } from "react-native-webview"; // Importa WebView

// Función para extraer el videoId de la URL de YouTube
const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Función para verificar si la URL es de Instagram
const isInstagramUrl = (url) => {
  return url.includes("instagram.com");
};

export default function VideoCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const videoId = extractVideoId(item.url);
  const isInstagram = isInstagramUrl(item.url); // Verifica si es una URL de Instagram

  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <View style={styles.videoCard}>
      <View style={styles.videoInfo}>
        {/* Contenedor con thumbnail, texto y el botón de expansión */}
        <View style={styles.thumbnailContainer}>
          {/* Miniatura del video */}
          {thumbnailUrl && !isInstagram && (
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

          {/* Botón de expansión, alineado a la derecha */}
          <TouchableOpacity onPress={toggleExpansion} style={styles.expandButton}>
            <Text style={styles.expandButtonText}>{isExpanded ? "v" : ">"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mostrar video o previsualización dependiendo del estado */}
      {isExpanded && !isInstagram && videoId && (
        <View style={styles.videoPreview}>
          <YoutubePlayer height={200} play={false} videoId={videoId} />
        </View>
      )}

      {/* Mostrar vista previa de Instagram */}
      {isExpanded && isInstagram && (
        <View style={styles.videoPreview}>
          <WebView
            source={{ uri: item.url }}
            style={{ height: 300, width: '100%' }}
          />
        </View>
      )}

      <Text style={styles.fecha}>{item.type} - {item.createdAt}</Text>
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
    flexDirection: "row", // Coloca el thumbnail, el texto y el botón en una fila
    alignItems: "center", // Alinea verticalmente los elementos
    justifyContent: "space-between", // Espaciado entre los elementos (thumb, texto y botón)
  },
  thumbnail: {
    width: 100,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Permite que el texto ocupe el espacio disponible
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
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  expandButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  videoPreview: {
    marginTop: 10,
  },
});
