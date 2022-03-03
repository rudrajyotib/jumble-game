import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";


function PressableButton(props) {
    return (
        <View style={{ ...styles.horizontalQuestionContainer, ...styles.undoButtonContainer }}>
            <Pressable style={{ ...styles.card, ...styles.buttonCard }} disabled={props.disabled} onPress={props.handlerFunction}><Text>{props.buttonLabel}</Text></Pressable>
        </View>
    )
}

export default PressableButton