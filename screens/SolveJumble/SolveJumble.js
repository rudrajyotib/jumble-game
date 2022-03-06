import { useState } from "react";
import { View } from "react-native";
import LettersContainer from "../../components/LettersContainer";
import PressableButton from "../../components/PressableButton";
import { styles } from "../../styles/styles";


function SolveJumble({ route, navigation }) {

    const { game } = route.params

    const [questionLetters, setQuestionLetters] = useState(game.questionFrame);
    const [answerLetters, setAnswerLetters] = useState(game.answerFrame);

    function questionButtonPressHandler(index) {
        game.moveFromQuestionToAnswerFrame(index);
        //game.outputPresentState()
        setQuestionLetters([...game.questionFrame]);
        setAnswerLetters([...game.answerFrame]);
        if (game.answerReached()) {
            navigation.navigate('GameOver', {
                result: 'success'
            })
        }
    }

    function skipHandler() {
        navigation.navigate('GameOver', {
            result: 'skip'
        })
    }

    function undoButtonPressHandler() {
        game.undoLastAnswer();
        // game.outputPresentState()
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
                    <PressableButton
                        style={styles.buttonCard}
                        disabled={game.lastAnswerPoint < 0}
                        handlerFunction={undoButtonPressHandler}
                        buttonLabel={'Undo'} />
                </View>
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <PressableButton
                            style={styles.buttonCard}
                            handlerFunction={skipHandler}
                            buttonLabel={'Skip'} />
                    </View>
                </View>
            </View>
        </View >
    );

}


export default SolveJumble