import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from "react-native-webview";
import { removeVideo } from "../firebase/videos.js"; // Importa la función para eliminar video
import { addToFavorites, removeFromFavorites } from "../firebase/favorites.js"; // Funciones para agregar/quitar de favoritos

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

export default function VideoCard({ item, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar si el video es favorito

  useEffect(() => {
    // Aquí puedes agregar la lógica para comprobar si el video ya está en favoritos
    const checkFavoriteStatus = async () => {
      // Comprobar en Firestore si el video está marcado como favorito
      const favoriteStatus = await checkIfFavorite(item.id); // Crear esta función
      setIsFavorite(favoriteStatus);
    };

    checkFavoriteStatus();
  }, [item.id]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const videoId = extractVideoId(item.url);
  const isInstagram = isInstagramUrl(item.url); // Verifica si es una URL de Instagram

  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  // Función para eliminar el video
  const handleDelete = async () => {
    try {
      console.log("Eliminando video...");
      await removeVideo(item.id);  // Elimina el video usando el ID del video actual
      onUpdate();  // Actualiza la lista de videos después de eliminar el video
    } catch (error) {
      console.error("Error eliminando video: ", error);
    }
  };

   // Función para gestionar favoritos
   const handleFavorite = async () => {
    if (!videoId) {
      console.error("videoId no está definido.");
      return;
    }

    try {
      if (isFavorite) {
        // Si ya está en favoritos, lo eliminamos
        await removeFromFavorites(videoId);
      } else {
        // Si no está en favoritos, lo agregamos
        await addToFavorites(videoId);
      }
      setIsFavorite(!isFavorite); // Actualiza el estado de favorito
    } catch (error) {
      console.error("Error al gestionar los favoritos: ", error);
    }
  };

  // Función para editar el video (puedes personalizar la edición como desees)
  const handleEdit = () => {
    console.log("Editando video...");
    // Aquí puedes navegar a una pantalla de edición o permitir editar los detalles del video
    // navigation.navigate("EditVideoScreen", { videoId: item.id });
  };

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
            style={{ height: 570, width: '100%' }}
          />
        </View>
      )}

      <Text style={styles.fecha}>{item.type} - {item.createdAt}</Text>

      {/* Botones de editar, eliminar y agregar a favoritos */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>

        {/* Botón para añadir a favoritos */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavorite}
        >
          <Text style={styles.favoriteButtonText}>{isFavorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  thumbnail: {
    width: 100,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
    padding: 10,
    borderRadius: 5,
  },
  favoriteButton: {
    backgroundColor: "#FFD700", // Color de fondo para el botón de favorito
    padding: 10,
    borderRadius: 5,
  },
  favoriteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
