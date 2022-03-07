import { useState } from "react";
import { Alert, ImageBackground, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from "react-native";
import imageDictionary from "../../assets/images";
import EnglishUpperCaseTextInput from "../../components/EnglishUpperCaseTextInput";
import LettersContainer from "../../components/LettersContainer";
import PressableButton from "../../components/PressableButton";
import { styles } from "../../styles/styles";
import { GameController, randomiseString } from "../../utils/GameController";
import { checkStringsAnagram, createLettersArrayWithPosition } from "../../utils/StringUtils";

function CreateJumble({ route, navigation }) {

    const [targetWord, setTargetWord] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [jumbledWord, setJumbledWord] = useState('')
    const [shuffledWordFrame, setShuffledWordFrame] = useState([]);

    function confirmHandler() {
        if (confirmed || targetWord === '' || targetWord.length < 3) {
            return
        }
        setJumbledWord(() => {
            randomString = randomiseString(targetWord)
            setShuffledWordFrame(() => createLettersArrayWithPosition(randomString))
            return randomString
        })
        setConfirmed(() => true)
    }

    function resetHandler() {
        if (!confirmed) {
            return
        }
        setConfirmed(() => false)
        setJumbledWord(() => '')
        setTargetWord(() => {
            return ''
        })
    }

    function reShuffleHandler() {
        setJumbledWord(() => {
            randomString = randomiseString(targetWord)
            setShuffledWordFrame(() => createLettersArrayWithPosition(randomString))
            return randomString
        })
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
        setTargetWord('')
        setConfirmed(false)
        setJumbledWord(() => '')
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ ...styles.parentContainer }}>

            <ImageBackground
                source={imageDictionary.createBackground}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={styles.createJumbleContainer}>
                        {!confirmed &&
                            <View>
                                <View style={{ backgroundColor: "orange", opacity: 0.9, alignItems: "center", marginBottom: 40 }}>
                                    <Text style={{ fontSize: 30 }}>Set target word</Text>
                                </View>
                                <View >
                                    <EnglishUpperCaseTextInput
                                        fontWeight={"bold"}
                                        style={{ ...styles.input, ...{ backgroundColor: 'white', opacity: 0.8 } }}
                                        handleOnChangeTargetWord={(text) => setTargetWord(() => text)}
                                        editable={!confirmed}
                                        value={targetWord}
                                        maxLength={20}
                                    />
                                </View>
                                <View>
                                    <PressableButton style={styles.buttonCard} disabled={targetWord === ''} handlerFunction={confirmHandler} buttonLabel={'SHUFFLE'} />
                                </View>
                            </View>
                        }

                        {
                            confirmed &&
                            <View >
                                <LettersContainer
                                    disableCheckFunction={() => true}
                                    questionButtonPressHandler={() => { }}
                                    lettersFrame={shuffledWordFrame} keyPrefix={'shuffle'} maxRowLength={8} />
                            </View>
                        }
                        {
                            confirmed &&
                            <View style={{ ...styles.horizontalContainer, ...{ justifyContent: "space-between" } }}>
                                <PressableButton style={styles.buttonCard} handlerFunction={startHandler} buttonLabel={'Start'} />
                                <PressableButton style={styles.buttonCard} disabled={targetWord === ''} handlerFunction={reShuffleHandler} buttonLabel={'Re-shuffle'} />
                                <PressableButton style={styles.buttonCard} disabled={targetWord === ''} handlerFunction={resetHandler} buttonLabel={'Reset'} />
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>

        </KeyboardAvoidingView >
    )

}


export default CreateJumble