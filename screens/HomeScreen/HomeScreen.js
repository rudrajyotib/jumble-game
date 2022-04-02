import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Modal, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import LettersContainer from '../../components/elements/LettersContainer';
import ReadyCheck from '../../components/modals/ReadyCheck';
import { setGameModeOnline } from '../../store/data/GameStateSlice';
import { createLettersArrayWithPosition } from '../../utils/StringUtils';



function OnButtonPress() {
  Alert.alert('Hi and Hello');
}


function HomeScreen({ route, navigation }) {


  const [clickCount, setClickCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [startVisible, setStartVisible] = useState(false);
  const [frame, setFrame] = useState(createLettersArrayWithPosition("INTERNATIONALIZATION"));

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Welcome to native</Text>
      <StatusBar style="auto" />
      <Button style={styles.button} title="Hello World" onPress={() => Alert.alert('Hello')} />
      <Button title="Hello World2" paddingTop="10" onPress={OnButtonPress} />
      <Text>You pressed me {clickCount} time(s)</Text>
      <Button color="#f194ff" title="Up Count" onPress={() => setClickCount(clickCount + 1)} />
      <Button color="#f194ff" title="Show Start" onPress={() => setStartVisible(!startVisible)} />
      <Button color="#f194ff" title="Show Challemges" onPress={() => {
        navigation.navigate('Challenges', {})
      }
      } />
      <TextInput style={styles.input} />

      {
        startVisible && <ReadyCheck onStart={() => setStartVisible(!startVisible)} />
      }


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
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: 'red'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default HomeScreen