import { useState } from "react"
import { View, Text, TextInput, Alert } from "react-native"
import EnglishUpperCaseTextInput from "../../components/EnglishUpperCaseTextInput";
import PressableButton from "../../components/PressableButton";
import { styles } from "../../styles/styles"
import GameController from "../../utils/GameController";
import { checkStringsAnagram } from "../../utils/StringUtils";

function CreateJumble({ route, navigation }) {

    const [targetWord, setTargetWord] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [jumbledWord, setJumbledWord] = useState('')

    function confirmHandler() {
        if (confirmed || targetWord === '' || targetWord.length < 3) {
            return
        }
        setConfirmed(() => true)
    }

    function resetHandler() {
        if (!confirmed) {
            return
        }
        setConfirmed(() => false)
        setJumbledWord(() => '')
        setTargetWord(() => '')
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
                    <EnglishUpperCaseTextInput
                        style={styles.input}
                        handleOnChangeTargetWord={(text) => setTargetWord(() => text)}
                        editable={!confirmed}
                        value={targetWord}
                        maxLength={20}
                    />
                </View>

                <View style={{ ...styles.horizontalQuestionContainer, ...styles.card }}>
                    <View >
                        <PressableButton style={styles.buttonCard} disabled={targetWord === ''} handlerFunction={confirmHandler} buttonLabel={'Confirm'} />
                    </View>
                    <View >
                        <PressableButton style={styles.buttonCard} disabled={targetWord === ''} handlerFunction={resetHandler} buttonLabel={'Reset'} />
                    </View>
                </View>
                <View><Text>Jumble the word</Text></View>

                {
                    confirmed &&
                    <View style={styles.card}>
                        <EnglishUpperCaseTextInput
                            style={styles.input}
                            handleOnChangeTargetWord={(text) => setJumbledWord(() => text)}
                            editable={true}
                            value={jumbledWord}
                            maxLength={targetWord.length}
                        />
                    </View>
                }
                {
                    confirmed &&
                    <View style={styles.card}>
                        <PressableButton style={styles.buttonCard} handlerFunction={startHandler} buttonLabel={'Start'} />
                    </View>
                }
            </View>
        </View>
    )

}


export default CreateJumble