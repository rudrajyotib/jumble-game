import { useState } from "react"
import { ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from "react-native"
import imageDictionary from "../../assets/images"
import { styles } from "../../styles/styles"
import PlayerName from "../PlayerName"
import PressableButton from "../elements/PressableButton"

function DualPlayerMode(props) {


    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')


    function proceedToGameHandler() {
        props.onContinue(player1, player2)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ ...styles.parentContainer, flex: 1 }}>

            <ImageBackground
                source={imageDictionary.landingBackground}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={{ flex: 1, paddingTop: 300 }}>
                        <View style={{ flex: 9 }}>
                            <PlayerName caption="Player 1" onTextChange={(text) => setPlayer1(text)} />
                            <PlayerName caption="Player 2" onTextChange={(text) => setPlayer2(text)} />
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-end" }}>
                            <PressableButton
                                handlerFunction={proceedToGameHandler}
                                style={{ ...styles.buttonCard, ...styles.buttonPrimary, backgroundColor: 'mediumorchid' }}
                                disabled={!(('' !== player1) && ('' !== player2))}
                                buttonSize="medium"
                                buttonLabel="Proceed to Game" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>

        </KeyboardAvoidingView >
    )

}

export default DualPlayerMode