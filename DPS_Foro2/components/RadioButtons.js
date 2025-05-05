import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({ checked, onPress }) => {
    return (
        <TouchableOpacity style={styles.checkbox} onPress={onPress}>
            {checked && <Text>✓</Text>}
        </TouchableOpacity>
    );
};

const RadioButtons = ({ options, selectedOption, onSelect }) => {
    return (
        <View style={styles.container}>
            {options.map((option) => (
                <View key={option} style={styles.optionContainer}>
                    <Checkbox
                        checked={selectedOption === option}
                        onPress={() => onSelect(option)}
                    />
                    <TouchableOpacity
                        style={styles.optionTextContainer}
                        onPress={() => onSelect(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center', // Centrar horizontalmente
        marginBottom: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20, // Espacio entre las opciones
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    optionTextContainer: {
        justifyContent: 'center', // Centrar el texto verticalmente
    },
    optionText: {
        fontSize: 16,
    },
});

export default RadioButtons;