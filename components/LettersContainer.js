import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";

function LettersContainer(props) {
    return (
        <View style={styles.horizontalQuestionContainer}>
            {
                props.lettersFrame.map(letter => <Pressable style={{ ...styles.card, ...styles.letterCard }} key={`${props.keyPrefix}${letter.key}`}
                    disabled={props.disableCheckFunction(letter)} onPress={props.questionButtonPressHandler.bind(this, letter.key)}>
                    <Text style={styles.questionText} >{letter.value}</Text>
                </Pressable>)
            }
        </View>
    )
}


export default LettersContainer