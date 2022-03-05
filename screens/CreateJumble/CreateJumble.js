import { useState } from "react"
import { View, Text, TextInput, Alert } from "react-native"
import PressableButton from "../../components/PressableButton";
import { styles } from "../../styles/styles"
import GameController from "../../utils/GameController";
import { checkStringsAnagram } from "../../utils/StringUtils";

function CreateJumble({ navigation }) {

    const [targetWord, setTargetWord] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [jumbledWord, setJumbledWord] = useState('')

    function handleOnChangeTargetWord(text) {
        let val = text.replace(/[^A-Z]/ig, '');
        setTargetWord(val.toUpperCase())
    }

    function handleOnChangeJumbledWord(text) {
        let val = text.replace(/[^A-Z]/ig, '');
        setJumbledWord(val.toUpperCase())
    }

    function confirmHandler() {
        if (confirmed || targetWord === '' || targetWord.length < 3) {
            return
        }
        setConfirmed(true)
    }

    function resetHandler() {
        if (!confirmed) {
            return
        }
        setConfirmed(false)
        setJumbledWord('')
        setTargetWord('')
    }

    function startHandler() {
        if (!checkStringsAnagram(targetWord, jumbledWord)) {
            Alert.alert('Word not jumbled');
            return;
        }
        navigation.navigate('SolveJumble', {
            targetWord: targetWord,
            jumbledWord: jumbledWord,
            game: new GameController(jumbledWord, targetWord)
        })
    }


    return (
        <View style={{ ...styles.parentContainer }}>
            <View style={{ ...styles.questionContainer, ...{ backgroundColor: '#2BDCBA' } }}>
                <Text>Create jumble word for your opponent</Text>
                <View style={styles.card}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleOnChangeTargetWord}
                        autoCapitalize="characters"
                        keyboardAppearance="default"
                        value={targetWord}
                        editable={!confirmed}
                        maxLength={8}
                    />
                </View>

                <View style={{ ...styles.horizontalQuestionContainer, ...styles.card }}>
                    <View >
                        <PressableButton disabled={targetWord === ''} handlerFunction={confirmHandler} buttonLabel={'Confirm'} />
                    </View>
                    <View >
                        <PressableButton disabled={targetWord === ''} handlerFunction={resetHandler} buttonLabel={'Reset'} />
                    </View>
                </View>
                <View><Text>Jumble the word</Text></View>

                {
                    confirmed &&
                    <View style={styles.card}>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleOnChangeJumbledWord}
                            autoCapitalize="characters"
                            keyboardAppearance="default"
                            value={jumbledWord}
                            maxLength={targetWord.length}
                        />
                    </View>
                }
                {
                    confirmed &&
                    <View style={styles.card}>
                        <PressableButton handlerFunction={startHandler} buttonLabel={'Start'} />
                    </View>
                }
            </View>
        </View>
    )

}


export default CreateJumble