import { useState } from "react"
import { View, Text, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ImageBackground } from "react-native"
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import imageDictionary from "../../assets/images";
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
        setTargetWord(() => {
            return ''
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
                        <View style={{ backgroundColor: "white", opacity: 0.9, alignItems: "center" }}>
                            <Text style={{ fontSize: 16 }}>Set your target word</Text>
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

                        <View style={{ ...styles.horizontalContainer }}>
                            <View >
                                <PressableButton style={styles.buttonCard} disabled={targetWord === ''} handlerFunction={confirmHandler} buttonLabel={'Confirm'} />
                            </View>
                            <View >
                                <PressableButton style={styles.buttonCard} disabled={targetWord === ''} handlerFunction={resetHandler} buttonLabel={'Reset'} />
                            </View>
                        </View>


                        {
                            confirmed &&
                            <View >
                                <View style={{ backgroundColor: "white", opacity: 0.9, alignItems: "center" }}>
                                    <Text style={{ fontSize: 16 }}>Scramble your target word</Text>
                                </View>
                                <EnglishUpperCaseTextInput
                                    fontWeight={"bold"}
                                    style={{ ...styles.input, ...{ backgroundColor: 'white', opacity: 0.8 } }}
                                    handleOnChangeTargetWord={(text) => setJumbledWord(() => text)}
                                    editable={true}
                                    value={jumbledWord}
                                    maxLength={targetWord.length}
                                />
                            </View>
                        }
                        {
                            confirmed &&
                            <View >
                                <PressableButton style={styles.buttonCard} handlerFunction={startHandler} buttonLabel={'Start'} />
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>

        </KeyboardAvoidingView >
    )

}


export default CreateJumble