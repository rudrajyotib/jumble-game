import { useState } from "react";
import { View } from "react-native";
import LettersContainer from "./LettersContainer";
import PressableButton from "./PressableButton";
import { styles } from "../styles/styles"



function SolutionPad(props) {


    const game = props.game

    const [questionLetters, setQuestionLetters] = useState(game.questionFrame);
    const [answerLetters, setAnswerLetters] = useState(game.answerFrame);

    function questionButtonPressHandler(index) {
        game.moveFromQuestionToAnswerFrame(index);
        setQuestionLetters([...game.questionFrame]);
        setAnswerLetters([...game.answerFrame]);
        if (game.answerReached()) {
            props.onSuccess()
        }
    }

    function skipHandler() {
        props.onSkip()
    }

    function undoOneButtonPressHandler() {
        game.undoLastAnswer();
        setQuestionLetters([...game.questionFrame]);
        setAnswerLetters([...game.answerFrame]);
    }

    function undoAllButtonPressHandler() {
        game.undoAll();
        setQuestionLetters([...game.questionFrame]);
        setAnswerLetters([...game.answerFrame]);
    }



    return (
        <View style={styles.parentContainer}>
            <View style={styles.questionContainer}>
                <LettersContainer
                    disableCheckFunction={(letter) => letter.value.trim() === ''}
                    questionButtonPressHandler={questionButtonPressHandler}
                    lettersFrame={questionLetters} keyPrefix={'Q'} maxRowLength={8} />
            </View>
            <View style={{ ...styles.answerContainer }}>
                <View style={{ flex: 3, justifyContent: "center" }}>
                    <LettersContainer
                        disableCheckFunction={() => true}
                        questionButtonPressHandler={() => { }}
                        lettersFrame={answerLetters} keyPrefix={'A'} maxRowLength={8} />
                    <View style={styles.horizontalContainer}>
                        <PressableButton
                            style={{ ...styles.buttonCard, ...styles.buttonSecondary, paddingHorizontal: 10 }}
                            disabled={game.lastAnswerPoint < 0}
                            buttonSize="small"
                            handlerFunction={undoOneButtonPressHandler}
                            buttonLabel={'Undo'} />
                        <PressableButton
                            style={{ ...styles.buttonCard, ...styles.buttonSecondary }}
                            disabled={game.lastAnswerPoint < 0}
                            buttonSize="small"
                            handlerFunction={undoAllButtonPressHandler}
                            buttonLabel={'Undo All'} />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <PressableButton
                            style={styles.buttonCard}
                            buttonSize="small"
                            handlerFunction={skipHandler}
                            buttonLabel={'Skip'} />
                    </View>
                </View>
            </View>
        </View >
    );

}


export default SolutionPad