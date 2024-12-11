import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Hsection() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        <Text style={styles.video}>Video</Text>
        <Text style={styles.lister}>Lister</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black", // Black background
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // Default text color is white
  },
  video: {
    color: "red", // Color for "Video" part
  },
  lister: {
    color: "white", // Color for "Lister" part
  },
});
