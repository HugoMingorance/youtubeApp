import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Importa setDoc desde Firestore
import { auth, db } from '../../firebase/firebaseConfig'; // Asegúrate de tener db importado

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      // Crear usuario con email y password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crear documento en la colección 'favorits' con el uid del usuario
      await setDoc(doc(db, "favorits", user.uid), {
        videoIds: [] // Inicializar el campo videoIds como un array vacío
      });

      // Navegar a la pantalla de favoritos después de registrar al usuario
      navigation.replace('FavoritsScreen');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <Button title="Registrarse" onPress={handleRegister} />
      <Text style={styles.loginText} onPress={() => navigation.navigate('LoginScreen')}>
        ¿Ya tienes una cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  loginText: {
    color: 'blue',
    marginTop: 16,
    textAlign: 'center',
  },
});
