import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe"; // Para videos de YouTube
import { Linking } from "react-native";

export default function VideoCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false); // Estado para manejar la expansión del video

  // Función para alternar la visibilidad del video o la previsualización
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.videoCard}>
      <View style={styles.videoInfo}>
        {/* Título y descripción del video */}
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoDescription}>{item.description}</Text>
      </View>

      {/* Botón desplegable */}
      <TouchableOpacity onPress={toggleExpansion} style={styles.expandButton}>
        <Text style={styles.expandButtonText}>
          {isExpanded ? "v" : ">"}
        </Text>
      </TouchableOpacity>

      {/* Mostrar video o previsualización dependiendo del estado */}
      {isExpanded && (
        <View style={styles.videoPreview}>
          {item.type === "youtube" ? (
            <YoutubePlayer
              height={200}
              play={false}
              videoId={item.url.split("v=")[1]} // Obtiene el ID del video de YouTube
            />
          ) : (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Image
                source={{ uri: item.thumbnail || "https://via.placeholder.com/300" }}
                style={styles.thumbnail}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
