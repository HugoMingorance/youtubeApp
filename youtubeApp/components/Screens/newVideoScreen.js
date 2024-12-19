import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Asegúrate de tener esta librería instalada.
import { fetchUserLists, addList, addToUser } from "../../firebase/lists"; // Asegúrate de tener la función addList.
import { addVideo } from "../../firebase/addVideo"; // Función para agregar un video.
import FSection from "../FSection"; // Footer de la app.
import firebase from "firebase/app";
import 'firebase/firestore'; 

export default function NewVideoScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedList, setSelectedList] = useState(""); // Solo una lista seleccionada.
  const [allLists, setAllLists] = useState([]); // Todas las listas disponibles.
  const [newListName, setNewListName] = useState(""); // Para el nombre de la nueva lista.
  const [newListDescription, setNewListDescription] = useState("");
  const [isCreatingNewList, setIsCreatingNewList] = useState(false); // Para saber si estamos creando una nueva lista.

  // Dentro del componente NewVideoScreen
useEffect(() => {
  const loadUserLists = async () => {
    try {
      const userLists = await fetchUserLists();  // Usamos la nueva función
      setAllLists(userLists);
    } catch (error) {
      console.error("Error fetching user lists: ", error);
    }
  };

  loadUserLists();
}, []);  // Solo al cargar la pantalla


  // Maneja la acción de agregar un nuevo video
  const handleAddVideo = async () => {
    if (!title || !type || !url || (!selectedList && !isCreatingNewList)) {
      Alert.alert("Error", "Por favor, completa todos los campos y selecciona o crea una lista.");
      return;
    }

    // Si estamos creando una nueva lista, primero la creamos
    let videoData;
    let newListId = selectedList;

    if (isCreatingNewList) {
      if (!newListName) {
        Alert.alert("Error", "Por favor, ingresa un nombre para la nueva lista.");
        return;
      }

      // Crear la nueva lista
      const newList = await addList(newListName, newListDescription); // Asegúrate de tener la función addList en tu firebase/lists.js
      newListId = newList.id; // Obtener el ID de la nueva lista
    }

    videoData = {
      title,
      type,
      url,
      description,
      lists: [newListId], // Usamos la lista seleccionada o la recién creada
      createdAt: new Date().toISOString().split("T")[0], // Solo la fecha en formato YYYY-MM-DD
    };

    try {
      // Llamamos a la función para agregar el video y actualizar la lista
      await addVideo(videoData);
      await addToUser(newListId)
      Alert.alert("Éxito", "Video agregado correctamente.");

      // Limpiar los campos
      setTitle("");
      setType("");
      setUrl("");
      setDescription("");
      setSelectedList("");
      setNewListName("");
      setNewListDescription("");
      setIsCreatingNewList(false);
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

          {/* Picker para seleccionar una lista o crear una nueva */}
          <Picker
            selectedValue={selectedList}
            onValueChange={(itemValue) => {
              setSelectedList(itemValue);
              setIsCreatingNewList(itemValue === "new"); // Si selecciona "Crear nueva lista", muestra los campos para nueva lista
            }}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una lista" value="" />
            <Picker.Item label="Crear nueva lista" value="new" />
            {allLists.map((list) => (
              <Picker.Item key={list.id} label={list.name} value={list.id} />
            ))}
          </Picker>

          {/* Inputs para crear nueva lista (solo visibles si está seleccionada la opción "Crear nueva lista") */}
          {isCreatingNewList && (
            <TextInput
              placeholder="Nombre de la nueva lista"
              value={newListName}
              onChangeText={setNewListName}
              style={styles.input}
            />
          )}
          {isCreatingNewList && (
            <TextInput
              placeholder="Descripción de la nueva lista"
              value={newListDescription}
              onChangeText={setNewListDescription}
              style={styles.input}
            />
          )}

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
