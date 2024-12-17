import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { myColors } from '../../styles/Colors';
import Button from '../Button';
import { ThemeContext } from '../../context/ThemeContext';

export default function TemperatureConverter() {
    const theme = useContext(ThemeContext);
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('C');
    const [toUnit, setToUnit] = useState('F');
    const [result, setResult] = useState('');

    const convertTemperature = () => {
        if (!value) return;
        const inputValue = parseFloat(value);

        let convertedValue = 0;
        if (fromUnit === toUnit) {
            convertedValue = inputValue; // Same unit
        } else if (fromUnit === 'C' && toUnit === 'F') {
            convertedValue = inputValue * 9 / 5 + 32; // Celsius to Fahrenheit
        } else if (fromUnit === 'C' && toUnit === 'K') {
            convertedValue = inputValue + 273.15; // Celsius to Kelvin
        } else if (fromUnit === 'F' && toUnit === 'C') {
            convertedValue = (inputValue - 32) * 5 / 9; // Fahrenheit to Celsius
        } else if (fromUnit === 'F' && toUnit === 'K') {
            convertedValue = (inputValue - 32) * 5 / 9 + 273.15; // Fahrenheit to Kelvin
        } else if (fromUnit === 'K' && toUnit === 'C') {
            convertedValue = inputValue - 273.15; // Kelvin to Celsius
        } else if (fromUnit === 'K' && toUnit === 'F') {
            convertedValue = (inputValue - 273.15) * 9 / 5 + 32; // Kelvin to Fahrenheit
        }

        setResult(`${convertedValue.toFixed(2)} °${toUnit}`);
    };

    const handleNumberPress = (num) => {
        if (num === '.' && value.includes('.')) return; // Prevent multiple decimals
        setValue(value + num);
    };

    const clearInput = () => {
        setValue('');
        setResult('');
    };

    const renderUnitButtons = (selectedUnit, setUnit) => {
        const units = ['C', 'F', 'K']; // Celsius, Fahrenheit, Kelvin
        return units.map((unit) => (
            <Button
                key={unit}
                title={unit}
                isBlue={selectedUnit === unit}
                onPress={() => setUnit(unit)}
            />
        ));
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? myColors.light : myColors.dark }]}>
            <Text style={[styles.title, { color: theme === 'light' ? myColors.black : myColors.white }]}>
                Temperature Converter
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: theme === 'light' ? myColors.black : myColors.white,
                            borderColor: theme === 'light' ? myColors.gray : myColors.white,
                            backgroundColor: theme === 'light' ? myColors.white : myColors.btnDark,
                        },
                    ]}
                    value={value}
                    onChangeText={setValue}
                    keyboardType="numeric"
                    placeholder="Enter value"
                    placeholderTextColor={myColors.gray}
                />
            </View>

            {result ? (
                <Text style={[styles.result, { color: theme === 'light' ? myColors.black : myColors.orange }]}>
                    {result}
                </Text>
            ) : null}

            <View style={styles.unitsContainer}>
                <Text style={[styles.sectionTitle, { color: theme === 'light' ? myColors.black : myColors.white }]}>
                    From:
                </Text>

                {/* Horizontal ScrollView for "From" units */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollRow}>
                    {renderUnitButtons(fromUnit, setFromUnit)}
                </ScrollView>

                <Text style={[styles.sectionTitle, { color: theme === 'light' ? myColors.black : myColors.white }]}>
                    To:
                </Text>

                {/* Horizontal ScrollView for "To" units */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollRow}>
                    {renderUnitButtons(toUnit, setToUnit)}
                </ScrollView>
            </View>

            <View style={styles.numpad}>
                <View style={styles.row}>
                    <Button title="7" onPress={() => handleNumberPress('7')} />
                    <Button title="8" onPress={() => handleNumberPress('8')} />
                    <Button title="9" onPress={() => handleNumberPress('9')} />
                </View>
                <View style={styles.row}>
                    <Button title="4" onPress={() => handleNumberPress('4')} />
                    <Button title="5" onPress={() => handleNumberPress('5')} />
                    <Button title="6" onPress={() => handleNumberPress('6')} />
                </View>
                <View style={styles.row}>
                    <Button title="1" onPress={() => handleNumberPress('1')} />
                    <Button title="2" onPress={() => handleNumberPress('2')} />
                    <Button title="3" onPress={() => handleNumberPress('3')} />
                </View>
                <View style={styles.row}>
                    <Button title="." onPress={() => handleNumberPress('.')} />
                    <Button title="0" onPress={() => handleNumberPress('0')} />
                    <Button title="C" isGray onPress={clearInput} />
                </View>
            </View>

            <View style={styles.convertButtonContainer}>
                <Button title="Convert" isBlue onPress={convertTemperature} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        fontSize: 18,
        width: '100%',
        marginBottom: 10,
    },
    unitsContainer: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'space-evenly',
    },
    numpad: {
        marginVertical: 20,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 12,
    },
    convertButtonContainer: {
        alignItems: 'center',
        marginVertical: -20,
        width: '100%',
    },
    result: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -10,
    },
});