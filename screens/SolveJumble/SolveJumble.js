import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { createAnswerSheet } from "../../utils/GameUtils";
import { createLettersArrayWithPosition } from "../../utils/StringUtils";
import { styles } from "../../styles/styles";


function SolveJumble(props) {


    const question = props.questionWord.toUpperCase();

    const [questionLetters, setQuestionLetters] = useState(createLettersArrayWithPosition(question));
    const [answerSheet, updateAnswerSheet] = useState(createAnswerSheet(question));

    function questionButtonPressHandler(index) {
        setQuestionLetters((questionLettersCurrent) => {
            let questionLettersUpdated = [...questionLettersCurrent];
            questionLettersUpdated[index].value = " ";
            return questionLettersUpdated;
        })
        updateAnswerSheet((answerSheetCurrent) => {
            answerSheetCurrent.lastAnswerPoint += 1
            answerSheetCurrent.userInput[answerSheetCurrent.lastAnswerPoint] = index;
            answerSheetCurrent.answerLetters[answerSheetCurrent.lastAnswerPoint].value = question.charAt(index)
            console.log('setting answer at ' + answerSheetCurrent.lastAnswerPoint + ' with letter' + question.charAt(index))
            return answerSheetCurrent
        })
    }

    function answerButtonPressHandler() {
        const lastAnswerPoint = answerSheet.lastAnswerPoint;
        console.log('answerSheet is ' + JSON.stringify(answerSheet))
        if (lastAnswerPoint < 0) {
            return
        }
        const questionIndexLastUsed = answerSheet.userInput[lastAnswerPoint];
        setQuestionLetters((questionLettersCurrent) => {
            let questionLettersUpdated = [...questionLettersCurrent];
            questionLettersUpdated[questionIndexLastUsed].value = question.charAt(questionIndexLastUsed);
            return questionLettersUpdated;
        })
        //answerSheet.userInput[lastAnswerPoint] = -1;
        //answerSheet.lastAnswerPoint = lastAnswerPoint - 1;
        updateAnswerSheet((answerSheetCurrent) => {
            answerSheetCurrent.userInput[lastAnswerPoint] = -1;
            answerSheetCurrent.lastAnswerPoint -= 1
            answerSheetCurrent.answerLetters[lastAnswerPoint].value = " "
            return answerSheetCurrent
        })
    }


    return (
        <View style={styles.parentContainer}>
            <View style={styles.questionContainer}>

                <View style={styles.horizontalQuestionContainer}>
                    {
                        questionLetters.map(questionLetter => <Pressable style={{ ...styles.card, ...styles.letterCard }} key={`Q${questionLetter.key}`}
                            disabled={questionLetter.value === ' '} onPress={questionButtonPressHandler.bind(this, questionLetter.key)}>
                            <Text style={styles.questionText} >{questionLetter.value}</Text>
                        </Pressable>)
                    }
                </View>
            </View>
            <View style={styles.answerContainer}>

                <View style={styles.horizontalQuestionContainer}>
                    {
                        answerSheet.answerLetters.map(answerLetter => <View style={{ ...styles.card, ...styles.letterCard }} key={`A${answerLetter.key}`} ><Text style={styles.questionText} >{answerLetter.value}</Text></View>)
                    }
                </View>
                <View style={{ ...styles.horizontalQuestionContainer, ...styles.undoButtonContainer }}>
                    <Pressable style={{ ...styles.card, ...styles.buttonCard }} disabled={answerSheet.lastAnswerPoint < 0} onPress={answerButtonPressHandler}><Text>Undo</Text></Pressable>
                </View>
            </View>
        </View >
    );

}


export default SolveJumble