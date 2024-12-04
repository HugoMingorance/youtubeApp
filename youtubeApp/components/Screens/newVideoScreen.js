import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Asegúrate de tener esta librería instalada.
import { fetchLists } from "../../firebase/lists"; // Para obtener las listas desde Firebase.
import { addVideo } from "../../firebase/addVideo"; // Función para agregar un video.
import FSection from "../FSection"; // Footer de la app.

export default function NewVideoScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedList, setSelectedList] = useState(""); // Solo una lista seleccionada.
  const [allLists, setAllLists] = useState([]); // Todas las listas disponibles.

  // Fetch de las listas disponibles desde Firebase
  useEffect(() => {
    const loadLists = async () => {
      try {
        const lists = await fetchLists();
        setAllLists(lists);
      } catch (error) {
        console.error("Error fetching lists: ", error);
      }
    };
    loadLists();
  }, []);

  // Maneja la acción de agregar un nuevo video
  const handleAddVideo = async () => {
    if (!title || !type || !url || !selectedList) {
      Alert.alert("Error", "Por favor, completa todos los campos y selecciona una lista.");
      return;
    }

    const videoData = {
      title,
      type,
      url,
      description,
      lists: [selectedList], // Solo una lista seleccionada.
    };

    try {
      // Llamamos a la función para agregar el video y actualizar la lista
      await addVideo(videoData);
      Alert.alert("Éxito", "Video agregado correctamente.");

      // Limpiar los campos
      setTitle("");
      setType("");
      setUrl("");
      setDescription("");
      setSelectedList("");
    } catch (error) {
      console.error("Error adding video: ", error);
      Alert.alert("Error", "Hubo un problema al agregar el video.");
    }
  };

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
      {/* Contenido principal */}
      <View style={{ flex: 9, justifyContent: "center", alignItems: "center", width: "100%" }}>
        <View style={{ padding: 20, width: "90%" }}>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Tipo (YouTube/Instagram)"
            value={type}
            onChangeText={setType}
            style={styles.input}
          />
          <TextInput
            placeholder="URL del Video"
            value={url}
            onChangeText={setUrl}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />

          {/* Picker para seleccionar una lista */}
          <Picker
            selectedValue={selectedList}
            onValueChange={(itemValue) => setSelectedList(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una lista" value="" />
            {allLists.map((list) => (
              <Picker.Item key={list.id} label={list.name} value={list.id} />
            ))}
          </Picker>

          <Button title="Agregar Video" onPress={handleAddVideo} />
        </View>
      </View>

      {/* Footer */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 0 }}>
        <FSection currentSection={5} onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
});
