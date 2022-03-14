import { useState } from "react"
import { Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from "react-native"
import { styles } from "../../styles/styles"
import { randomiseString } from "../../utils/StringUtils"
import { createLettersArrayWithPosition } from "../../utils/StringUtils"
import EnglishLettersOnlyTextInput from "../elements/EnglishLettersOnlyTextInput"
import ConfirmTarget from "../modals/ConfirmTarget"
import PressableButton from "../elements/PressableButton"



function OfflineShuffler(props) {

    const [confirmed, setConfirmed] = useState(false);
    const [targetWord, setTargetWord] = useState('');
    const [jumbledWord, setJumbledWord] = useState('')
    const [targetWordFrame, setTargetWordFrame] = useState([]);



    function confirmHandler() {
        if (confirmed || targetWord === '' || targetWord.length < 3) {
            return
        }
        setJumbledWord(() => {
            let randomString = randomiseString(targetWord)
            return randomString
        })
        setTargetWordFrame(() => createLettersArrayWithPosition(targetWord))
        setConfirmed(() => true)
    }

    function confirmTargetHandler() {
        props.onStart(targetWord, jumbledWord)
        setTargetWord('')
        setConfirmed(false)
        setJumbledWord(() => '')
    }

    function rejectHandler() {
        setConfirmed(() => false)
        setJumbledWord(() => '')
        setTargetWord(() => {
            return ''
        })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ ...styles.parentContainer }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.createJumbleContainer}>
                    {!confirmed &&
                        <View>
                            <View style={{ backgroundColor: "orange", opacity: 0.9, alignItems: "center", marginBottom: 40, padding: 20 }}>
                                {
                                    ((props.name) && ('' !== props.name)) &&

                                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>Hello {props.name}</Text>
                                }
                                <Text style={{ fontSize: 20, fontWeight: "normal" }}>Set word of your choice</Text>
                            </View>
                            <View >
                                <EnglishLettersOnlyTextInput
                                    fontWeight={"bold"}
                                    upperCaseOnly={true}
                                    style={{ ...styles.input, ...{ backgroundColor: 'white', opacity: 0.8 } }}
                                    onTextChange={(text) => setTargetWord(text)}
                                    editable={!confirmed}
                                    value={targetWord}
                                    maxLength={20}
                                />
                            </View>
                            <View>
                                <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} disabled={targetWord === ''} buttonSize="medium"
                                    handlerFunction={confirmHandler} buttonLabel={'Set Target'} />
                            </View>
                        </View>
                    }
                    {confirmed && <ConfirmTarget frame={targetWordFrame} modalVisibleProp={true} onRejectTarget={rejectHandler} onConfirmTarget={confirmTargetHandler} />}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default OfflineShuffler