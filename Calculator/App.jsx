import { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View, StatusBar, TextInput, Alert } from 'react-native';
import { myColors } from './src/styles/Colors';
import { ThemeContext } from './src/context/ThemeContext';
import MyKeyboard from './src/components/MyKeyboard';
import ConversionMenu from './src/components/ConversionMenu';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputValue, setInputValue] = useState(''); // State for input value

  // Input validation function (accepts only numbers and decimals)
  const validateInput = (input) => {
    return /^\d+(\.\d+)?$/.test(input) || input === ''; // Allows valid numbers or empty input
  };

  // Handle input changes
  const handleInputChange = (text) => {
    if (validateInput(text)) {
      setInputValue(text); // Update input if valid
    } else {
      Alert.alert('Invalid Input', 'Please enter numbers only.');
    }
  };

  StatusBar.setBackgroundColor(theme === 'light' ? myColors.light : myColors.dark);

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme === 'light' ? myColors.light : myColors.dark },
        ]}
      >
        {/* Menu Button */}
        <TouchableOpacity
          style={styles.conversionButton}
          onPress={() => setMenuVisible(true)}>
          <Text style={styles.conversionButtonText}>☰</Text>
        </TouchableOpacity>

        {/* Conversion Menu */}
        <ConversionMenu
          isVisible={menuVisible}
          onClose={() => setMenuVisible(false)}
        />

        {/* Theme Toggle */}
        <Switch
          value={theme === 'dark'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />

        {/* Input Field for Testing Validation */}
        <Text style={styles.label}>Enter Value:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter a number"
          value={inputValue}
          onChangeText={handleInputChange} // Input validation here
        />

        {/* MyKeyboard Component */}
        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  conversionButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: myColors.orange,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
    marginTop: 42,
  },
  conversionButtonText: {
    color: myColors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: myColors.dark,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: myColors.orange,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
});
