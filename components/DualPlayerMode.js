import { useState } from "react"
import { ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from "react-native"
import imageDictionary from "../assets/images"
import { styles } from "../styles/styles"
import PlayerName from "./PlayerName"
import PressableButton from "./PressableButton"

function DualPlayerMode(props) {


    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ ...styles.parentContainer, paddingTop: 40, flex: 1 }}>

            <ImageBackground
                source={imageDictionary.createBackground}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 9 }}>
                            <PlayerName caption="Player 1" onTextChange={(text) => setPlayer1(text)} />
                            <PlayerName caption="Player 2" onTextChange={(text) => setPlayer2(text)} />
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-end" }}>
                            <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="medium" buttonLabel="Proceed to Game" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>

        </KeyboardAvoidingView >
    )

}

export default DualPlayerMode