import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";


function HorizontalQuestionAnswerContainer(props) {
    return (
        <View style={styles.horizontalQuestionContainer}>
            {
                props.questionLetters.map(questionLetter => <Pressable style={{ ...styles.card, ...styles.letterCard }} key={`Q${questionLetter.key}`}
                    disabled={questionLetter.value === ' '} onPress={props.questionButtonPressHandler.bind(this, questionLetter.key)}>
                    <Text style={styles.questionText} >{questionLetter.value}</Text>
                </Pressable>)
            }
        </View>
    )
}

export default HorizontalQuestionAnswerContainer