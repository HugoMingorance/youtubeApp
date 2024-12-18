import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { deleteList, updateList } from "../firebase/lists"; // Importa las funciones para editar/eliminar

export default function ListCard({ list, onPress, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.name);
  const [editedDescription, setEditedDescription] = useState(list.description);

  const handleSave = async () => {
    try {
      await updateList(list.id, {
        name: editedTitle,
        description: editedDescription,
      });
      setIsEditing(false); // Salir del modo edición
      onUpdate(); // Notificar al padre para actualizar la lista
    } catch (error) {
      console.error("Error actualizando lista:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteList(list.id);
      console.log("Lista eliminada");
      onUpdate(); // Notificar al padre para actualizar la lista
    } catch (error) {
      console.error("Error eliminando lista:", error);
    }
  };

  return (
    <View style={styles.listItem}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={editedDescription}
            onChangeText={setEditedDescription}
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => onPress(list.id)}>
            <Text style={styles.listTitle}>{list.name}</Text>
            <Text style={styles.listDescription}>
              {list.description || "Sin descripción"}
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "97%",
    alignSelf: "center",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listDescription: {
    fontSize: 14,
    color: "#555",
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  textArea: {
    height: 60,
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
  saveButton: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
