import { useState } from "react";
import { View } from "react-native";
import HorizontalAnswerContainer from "../../components/HorizontalAnswerContainer";
import HorizontalQuestionAnswerContainer from "../../components/HorizontalQuestionContainer";
import PressableButton from "../../components/PressableButton";
import { styles } from "../../styles/styles";


function SolveJumble({ route, navigation }) {

    const { game } = route.params



    const [questionLetters, setQuestionLetters] = useState(game.questionFrame);
    const [answerSheet, updateAnswerSheet] = useState(game.answerFrame);


    function questionButtonPressHandler(index) {
        game.moveFromQuestionToAnswerFrame(index);
        game.outputPresentState()
        setQuestionLetters([...game.questionFrame]);
        updateAnswerSheet([...game.answerFrame]);
    }

    function undoButtonPressHandler() {
        game.undoLastAnswer();
        game.outputPresentState()
        setQuestionLetters([...game.questionFrame]);
        updateAnswerSheet([...game.answerFrame]);
    }


    return (
        <View style={styles.parentContainer}>
            <View style={styles.questionContainer}>
                <HorizontalQuestionAnswerContainer questionButtonPressHandler={questionButtonPressHandler} questionFrame={questionLetters} />
            </View>
            <View style={styles.answerContainer}>
                <HorizontalAnswerContainer answerFrame={answerSheet} />
                <PressableButton disabled={game.lastAnswerPoint < 0} handlerFunction={undoButtonPressHandler} buttonLabel={'Undo'} />
            </View>
        </View >
    );

}


export default SolveJumble