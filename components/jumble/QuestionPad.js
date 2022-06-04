import { Platform, Text, View } from "react-native"
import HideWithKeyboard from "react-native-hide-with-keyboard"
import { KeyboardAvoidingView } from "react-native"
import { styles } from "../../styles/styles"
import PressableButton from "../elements/PressableButton"
import ScoreSummary from "../game/ScoreSummary"
import JumbleQuestionController from "./JumbleQuestionController"

function QuestionPad(props) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ ...styles.parentContainer }}>
            <View style={{ flex: 1, paddingTop: 50 }}>

                {true === props.showScore && < HideWithKeyboard style={{ paddingTop: 30 }}>
                    <ScoreSummary players={props.players} scores={props.scores} />
                </HideWithKeyboard>}
                <JumbleQuestionController name={props.playerName} onStart={(targetWord, jumbledWord) => {
                    //setGameContainer(new GameContainer(GameConstants.GAME_TYPE_JUMBLE, jumbledWord, targetWord))
                    props.onQuestionSet(targetWord, jumbledWord)
                }} />
                <HideWithKeyboard>
                    <View style={{ paddingBottom: 40, alignItems: "flex-end" }}>
                        <PressableButton size="small" buttonLabel="Quit Game" style={{ ...styles.buttonLowPriority, borderWidth: 0 }} handlerFunction={() => {
                            props.onBack()
                        }} />
                    </View>
                </HideWithKeyboard>
            </View>
        </KeyboardAvoidingView>

    )
}

export default QuestionPad