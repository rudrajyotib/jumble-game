import { Text, View } from "react-native";
import { styles } from "../styles/styles";

function HorizontalAnswerContainer(props) {
    return (
        <View style={styles.horizontalQuestionContainer}>
            {
                props.answerFrame.map(answerLetter => <View style={{ ...styles.card, ...styles.letterCard }} key={`A${answerLetter.key}`} ><Text style={styles.questionText} >{answerLetter.value}</Text></View>)
            }
        </View>
    )
}

export default HorizontalAnswerContainer