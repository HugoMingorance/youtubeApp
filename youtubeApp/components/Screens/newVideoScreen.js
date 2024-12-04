import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker'; // Solo esta importación
import FSection from "../FSection";
import { fetchLists } from "../../firebase/lists"; // Asegúrate de que esta ruta sea correcta.
import { addVideo } from '../../firebase/addVideo.js'; // Función para agregar un video

export default function NewVideoScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedLists, setSelectedLists] = useState([]); // Para almacenar las listas seleccionadas
  const [allLists, setAllLists] = useState([]); // Para almacenar todas las listas disponibles

  // Fetch las listas disponibles desde Firebase
  useEffect(() => {
    const loadLists = async () => {
      try {
        const lists = await fetchLists(); // Obtén todas las listas desde Firestore
        setAllLists(lists); // Guarda las listas disponibles
      } catch (error) {
        console.error("Error fetching lists: ", error);
      }
    };
    loadLists();
  }, []);

  // Maneja la acción de agregar un nuevo video
  const handleAddVideo = async () => {
    if (!title || !type || !url || selectedLists.length === 0) {
      Alert.alert('Error', 'Por favor, ingresa todos los campos y selecciona al menos una lista.');
      return;
    }

    const videoData = {
      title,
      type,
      url,
      description,
      lists: selectedLists, // Guardar las listas seleccionadas
    };

    try {
      // Llamamos a la función para agregar el video a la base de datos
      await addVideo(videoData);
      Alert.alert('Éxito', 'Video agregado correctamente.');

      // Limpiar los campos después de agregar el video
      setTitle('');
      setType('');
      setUrl('');
      setDescription('');
      setSelectedLists([]);
    } catch (error) {
      console.error('Error adding video: ', error);
      Alert.alert('Error', 'Hubo un problema al agregar el video.');
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

          {/* Desplegable para seleccionar listas */}
          <Picker
            selectedValue={selectedLists}
            onValueChange={(itemValue) => setSelectedLists(itemValue)}
            style={styles.picker}
            multiple
            placeholder="Selecciona listas"
          >
            {allLists.map((list) => (
              <Picker.Item key={list.id} label={list.name} value={list.id} />
            ))}
          </Picker>

          <Button title="Agregar Video" onPress={handleAddVideo} />
        </View>
      </View>

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
