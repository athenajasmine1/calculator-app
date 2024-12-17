import React, { useState, useContext } from 'react';
import { myColors } from '../styles/Colors';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import WeightConverter from './conversions/WeightConverter';
import LengthConverter from './conversions/LengthConverter';
import SpeedConverter from './conversions/SpeedConverter';
import VolumeConverter from './conversions/VolumeConverter';
import TemperatureConverter from './conversions/TemperatureConverter';
import DataConverter from './conversions/DataConverter';
import TimeConverter from './conversions/TimeConverter';
import AreaConverter from './conversions/AreaConverter';
import { ThemeContext } from '../context/ThemeContext';


export default function ConversionMenu({ isVisible, onClose })  {
  const [selectedConverter, setSelectedConverter] = useState(null);
  const theme = useContext(ThemeContext);

  const renderConverter = () => {
    switch(selectedConverter) {
      case 'Weight':
        return <WeightConverter />;
      case 'Length':
        return <LengthConverter />;
      case 'Speed':
        return <SpeedConverter />;
      case 'Volume':
        return <VolumeConverter />;
      case 'Temperature':
        return <TemperatureConverter />;
      case 'Data':
        return <DataConverter />;
      case 'Time':
        return <TimeConverter />;
      case 'Area':
        return <AreaConverter />;



      
      default:
        return null;
    }
  };

  const conversionOptions = [
    { label: 'Weight', icon: '⚖️' },
    { label: 'Temperature', icon: '🌡️' },
    { label: 'Length', icon: '📏' },
    { label: 'Data', icon: '💾' },
    { label: 'Speed', icon: '🚗' },
    { label: 'Time', icon: '⏱️' },
    { label: 'Volume', icon: '🛢️' },
    { label: 'Area', icon: '📐' },
  ];

  if (selectedConverter) {
    return (
      <Modal visible={isVisible} animationType="slide">
        <View style={[
          styles.container,
          { backgroundColor: theme === 'light' ? myColors.light : myColors.dark }
        ]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedConverter(null)}>
            <Text style={[
              styles.backButtonText,
              { color: myColors.orange }
            ]}>← Back</Text>
          </TouchableOpacity>
          {renderConverter()}
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>
          <View style={styles.optionsGrid}>
            {conversionOptions.map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.option}
                onPress={() => setSelectedConverter(option.label)}
              >
                <Text style={styles.icon}>{option.icon}</Text>
                <Text style={styles.label}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backButton: {
      padding: 15,
      marginTop: 40,
    },
    backButtonText: {
      fontSize: 18,
      color: myColors.orange,
    },
    overlay: {
      marginTop:42,
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      justifyContent: 'flex-start', 
      alignItems: 'flex-start', 
    },
    menuContainer: {
      backgroundColor: myColors.orange, 
      width: 250,
      borderRadius: 10,
      padding: 15,
      marginTop: 5, 
      marginLeft: 10, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    closeButton: {
      alignSelf:'flex-start',
      marginBottom: myColors.white,
    },
    closeText: {
      fontSize: 18,
      color: '#fff',
    },
    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    option: {
      width: '45%',
      backgroundColor: myColors.white,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fontSize: 24,
      marginBottom: 5,
      color: myColors.black,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: myColors.black,
    },
});