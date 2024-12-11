// ListCard.js
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function ListCard({ list, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(list.id)}>
      <View style={styles.listItem}>
        <Text style={styles.listTitle}>{list.name}</Text>
        <Text style={styles.listDescription}>{list.description || "Sin descripción"}</Text>
      </View>
    </TouchableOpacity>
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
});