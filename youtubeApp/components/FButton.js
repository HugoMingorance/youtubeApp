import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FButton({ 
    selectedIcon,
    unselectedIcon,
    id,
    isSelected,
    onPress 
}) {

    return (
        <TouchableOpacity onPress={() => onPress(id)} style={styles.buttonContainer}>
            <View style={styles.iconContainer}>
                <Icon
                    name={isSelected ? selectedIcon : unselectedIcon}
                    size={50}
                    color="white"
                    style={styles.icon}
                />
                {isSelected}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        margin: 10,
    },
});
