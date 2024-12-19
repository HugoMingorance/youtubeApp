import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllListsScreen from "./components/Screens/allListsScreen"; 
import ListScreen from "./components/Screens/listScreen"; 
import NewVideoScreen from "./components/Screens/newVideoScreen"; 
import FavoritsScreen from "./components/Screens/favoritsScreen"; 
import LoginScreen from "./components/Screens/loginScreen"; 
import RegisterScreen from "./components/Screens/RegisterScreen"; 
import UserScreen from "./components/Screens/userScreen"; 

// Home Screen with a button in the center
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.navigate("allListsScreen")}>
        <Text style={styles.buttonText}>Go to All Lists</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("ListScreen")}>
        <Text style={styles.buttonText}>Go to List</Text>
      </Pressable>
    </View>
  );
}

// Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="allListsScreen" component={AllListsScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="ListScreen" component={ListScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="NewVideoScreen" component={NewVideoScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="FavoritsScreen" component={FavoritsScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="UserScreen" component={UserScreen} options = {{animation: 'none', headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
