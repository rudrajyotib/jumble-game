import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';


function OnButtonPress() {
  Alert.alert('Hi and Hello');
}


function HomeScreen(props) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Welcome to native</Text>
      <StatusBar style="auto" />
      <Button style={styles.button} title="Hello World" onPress={() => Alert.alert('Hello')} />
      <Button title="Hello World2" paddingTop="10" onPress={OnButtonPress} />
      <Text>You pressed me {clickCount} time(s)</Text>
      <Button color="#f194ff" title="Up Count" onPress={() => setClickCount(clickCount + 1)} />
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
  button: {
    //paddingTop: 10,
    //paddingBottom: 10,
    color: '#f194ff'
  }
});

export default HomeScreen