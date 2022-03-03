import { useState } from "react";
import { View } from "react-native";
import HorizontalAnswerContainer from "../../components/HorizontalAnswerContainer";
import HorizontalQuestionAnswerContainer from "../../components/HorizontalQuestionContainer";
import PressableButton from "../../components/PressableButton";
import { styles } from "../../styles/styles";
import { createAnswerSheet } from "../../utils/GameUtils";
import { createLettersArrayWithPosition } from "../../utils/StringUtils";


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

    function undoButtonPressHandler() {
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
                <HorizontalQuestionAnswerContainer questionButtonPressHandler={questionButtonPressHandler} questionLetters={questionLetters} />
            </View>
            <View style={styles.answerContainer}>
                <HorizontalAnswerContainer answerSheet={answerSheet} />
                <PressableButton answerSheet={answerSheet} disabled={answerSheet.lastAnswerPoint < 0} handlerFunction={undoButtonPressHandler} buttonLabel={'Undo'} />
            </View>
        </View >
    );

}


export default SolveJumble