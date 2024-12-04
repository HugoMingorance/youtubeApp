import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FButton from './FButton';

export default function FSection({ currentSection, onPress }) {
  return (
    <LinearGradient
      colors={['#ff0000', '#B60000', '#640000']}
      style={styles.gradientBackground}
    >
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <FButton 
            selectedIcon="bookmark" 
            unselectedIcon="bookmark-outline" 
            id={2} 
            onPress={onPress} 
            isSelected={currentSection == 2} 
          />
        </View>

        <View style={styles.buttonContainer}>
          <FButton 
            selectedIcon="plus-box-outline" 
            unselectedIcon="home-outline" 
            id={1} 
            onPress={onPress} 
            isSelected={currentSection == 1} 
          />
        </View>

        <View style={styles.buttonContainer}>
          <FButton 
            selectedIcon="account" 
            unselectedIcon="account-outline" 
            id={3} 
            onPress={onPress} 
            isSelected={currentSection == 3} 
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',  // Distribuye los botones uniformemente
    alignItems: 'center',
    width: '100%',
    height: 100,  // Asegura suficiente altura para los botones
  },
  buttonContainer: {
    marginHorizontal: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 1,  // Asegura que los botones ocupen suficiente espacio
  }
});
