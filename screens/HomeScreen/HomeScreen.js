import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Modal, Pressable } from 'react-native';
import LettersContainer from '../../components/LettersContainer';
import ReadyCheck from '../../components/modals/ReadyCheck';
import { createLettersArrayWithPosition } from '../../utils/StringUtils';



function OnButtonPress() {
  Alert.alert('Hi and Hello');
}


function HomeScreen(props) {
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
      <Button color="#f194ff" title="Show Modal" onPress={() => setModalVisible(!modalVisible)} />
      <Button color="#f194ff" title="Show Start" onPress={() => setStartVisible(!startVisible)} />
      <TextInput style={styles.input} />

      {
        startVisible && <ReadyCheck onStart={() => setStartVisible(!startVisible)} />
      }
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.modalText, ...styles.textStyle }}>You have set</Text>
              <LettersContainer
                lettersFrame={frame}
                keyPrefix={'Q'}
                maxRowLength={8}

                disableCheckFunction={() => { }}
                questionButtonPressHandler={() => { }}
              />
              <View style={{ paddingTop: 30 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>

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