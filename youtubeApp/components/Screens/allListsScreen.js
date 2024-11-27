import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FSection from '../FSection';

export default function AllListsScreen() {

    const handlePress = (id) => {
        console.log("Han clicat al botó " + id);
        if (id == 1){
          navigation.navigate("mapScreen");
        }else if (id == 2){
          navigation.navigate("FavouritesScreen");
        }else if (id == 3){
          navigation.navigate("userScreen");
        }
      };

  return (
    <View style={{ flex: 1 }}>
    <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    <Text>Open up App.js to start working on your app!</Text>
    <StatusBar style="auto" />
        </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
            <FSection currentSection={2} onPress={handlePress} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
