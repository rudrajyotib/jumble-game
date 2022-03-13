import { useState } from "react";
import { View } from "react-native";
import PressableButton from "../elements/PressableButton";
import { styles } from "../../styles/styles"
import CountDown from "react-native-countdown-component";
import LettersContainer from "../elements/LettersContainer";



function JumbleSolutionPadTimed(props) {


    const game = props.game

    const [questionLetters, setQuestionLetters] = useState(game.questionFrame);
    const [answerLetters, setAnswerLetters] = useState(game.answerFrame);

    function questionButtonPressHandler(index) {
        game.moveFromQuestionToAnswerFrame(index);
        setQuestionLetters([...game.questionFrame]);
        setAnswerLetters([...game.answerFrame]);
        if (game.answerReached()) {
            props.onGameResult('success')
        }
    }



    function skipHandler() {
        props.onGameResult('skip')
    }

    function timeOutHandler() {
        props.onGameResult('timedout')
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
            <View style={styles.countdownTimerContainer}>
                <CountDown
                    size={20}
                    until={90}
                    onFinish={timeOutHandler}
                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625' }}
                    digitTxtStyle={{ color: '#1CC625' }}
                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                    separatorStyle={{ color: '#1CC625' }}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: 'min', s: 'sec' }}
                    showSeparator
                />
            </View>
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


export default JumbleSolutionPadTimed