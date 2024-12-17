import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { myColors } from '../../styles/Colors';
import Button from '../Button';
import { ThemeContext } from '../../context/ThemeContext';

export default function AreaConverter() {
    const theme = useContext(ThemeContext);  // Get the current theme (light or dark)
    const [value, setValue] = useState('');  // Input value
    const [fromUnit, setFromUnit] = useState('Square Meters');  // Starting unit
    const [toUnit, setToUnit] = useState('Square Kilometers');  // Target unit
    const [result, setResult] = useState('');  // Conversion result

    // Conversion factors for different area units
    const units = {
        'Square Meters': { name: 'Square Meters', factor: 1 },
        'Square Kilometers': { name: 'Square Kilometers', factor: 1e6 },
        'Square Miles': { name: 'Square Miles', factor: 2.59e6 },
        'Square Yards': { name: 'Square Yards', factor: 0.836127 },
        'Square Feet': { name: 'Square Feet', factor: 0.092903 },
        'Square Inches': { name: 'Square Inches', factor: 0.00064516 },
        'Hectares': { name: 'Hectares', factor: 1e4 },
        'Acres': { name: 'Acres', factor: 4046.86 },
    };

    // Perform area conversion
    const convertArea = () => {
        if (!value) return;
        const baseValue = parseFloat(value) * units[fromUnit].factor;  // Convert to square meters
        const convertedValue = baseValue / units[toUnit].factor;  // Convert to target unit
        setResult(`${convertedValue.toFixed(4)} ${units[toUnit].name}`);  // Display result
    };

    // Handle number input
    const handleNumberPress = (num) => {
        if (num === '.' && value.includes('.')) return;  // Prevent multiple decimals
        setValue(value + num);
    };

    // Clear the input and result
    const clearInput = () => {
        setValue('');
        setResult('');
    };

    // Render buttons for unit selection
    const renderUnitButtons = (selectedUnit, setUnit) => {
        return Object.keys(units).map((unit) => (
            <Button
                key={unit}
                title={unit}
                isBlue={selectedUnit === unit}
                onPress={() => setUnit(unit)}  // Set the selected unit
            />
        ));
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? myColors.light : myColors.dark }]}>
            <Text style={[styles.title, { color: theme === 'light' ? myColors.black : myColors.white }]}>
                Area Converter
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, {
                        color: theme === 'light' ? myColors.black : myColors.white,
                        borderColor: theme === 'light' ? myColors.gray : myColors.white,
                        backgroundColor: theme === 'light' ? myColors.white : myColors.btnDark
                    }]}
                    value={value}
                    onChangeText={setValue}
                    keyboardType="numeric"
                    placeholder="Enter value"
                    placeholderTextColor={myColors.gray}
                />
            </View>

            {/* Show result if available */}
            {result ? (
                <Text style={[styles.result, { color: theme === 'light' ? myColors.black : myColors.orange }]}>
                    {result}
                </Text>
            ) : null}

            {/* From unit selection */}
            <View style={styles.unitsContainer}>
                <Text style={[styles.sectionTitle, { color: theme === 'light' ? myColors.black : myColors.white }]}>From:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.buttonRow}>
                        {renderUnitButtons(fromUnit, setFromUnit)}
                    </View>
                </ScrollView>

                {/* To unit selection */}
                <Text style={[styles.sectionTitle, { color: theme === 'light' ? myColors.black : myColors.white }]}>To:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.buttonRow}>
                        {renderUnitButtons(toUnit, setToUnit)}
                    </View>
                </ScrollView>
            </View>

            {/* Numpad for entering value */}
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

            {/* Convert button */}
            <View style={styles.convertButtonContainer}>
                <Button title="Convert" isBlue onPress={convertArea} />
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