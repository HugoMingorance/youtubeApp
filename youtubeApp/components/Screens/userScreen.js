import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import FSection from "../FSection"; // Asegúrate de que esta ruta sea correcta
import Hsection from "../Hsection"; // Asegúrate de que esta ruta sea correcta

export default function UserScreen({ navigation }) {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  // Función para cargar los datos del usuario
  const loadUserData = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser); // Establece el usuario en el estado
    } else {
      console.log("No hay un usuario autenticado.");
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // Cierra sesión en Firebase
      console.log("Sesión cerrada exitosamente.");
      navigation.navigate("LoginScreen"); // Navega a la pantalla de login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const handlePress = (id) => {
    console.log("Han clicat al botó " + id);
    if (id === 1) {
      navigation.navigate("allListsScreen");
    } else if (id === 2) {
      navigation.navigate("FavoritsScreen");
    } else if (id === 3) {
      navigation.navigate("UserScreen");
    }
  };

  useEffect(() => {
    loadUserData(); // Carga los datos del usuario cuando la pantalla se monta
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Header */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 0 }}>
        <Hsection />
      </View>

      {/* Cuerpo de la pantalla */}
      <View style={{ flex: 8, justifyContent: "center", alignItems: "center" }}>
        {user ? (
          <View style={{ alignItems: "center", padding: 20 }}>
            <Text style={styles.userInfo}>Correo electrónico: {user.email}</Text>
            <Button title="Cerrar sesión" onPress={handleLogout} color="#FF5A5F" />
          </View>
        ) : (
          <Text style={styles.userInfo}>Cargando datos del usuario...</Text>
        )}
      </View>

      {/* Footer */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 0 }}>
        <FSection currentSection={3} onPress={handlePress} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
});
