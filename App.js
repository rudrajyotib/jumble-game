import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SolveJumble from './screens/SolveJumble/SolveJumble';




export default function App() {


  return (
    <View style={styles.screen}>

      <SolveJumble questionWord="UMBLJe" answerWord="JUMBLE" />
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30
  }
});