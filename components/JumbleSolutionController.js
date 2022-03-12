import { useState } from "react";
import { View } from "react-native";
import LettersContainer from "./LettersContainer";
import PressableButton from "./PressableButton";
import { styles } from "../styles/styles"
import CountDown from "react-native-countdown-component";
import JumbleSolutionPadTimed from "./JumbleSolutionPadTimed";
import ReadyCheck from "./modals/ReadyCheck";
import CorrectAnswer from "./modals/CorrectAnswer";
import { createLettersArrayWithPosition } from "../utils/StringUtils";




function JumbleSolutionController(props) {

    const game = props.game

    const [questionLetters, setQuestionLetters] = useState(game.questionFrame);
    const [answerLetters, setAnswerLetters] = useState(game.answerFrame);
    const [gameState, setGameState] = useState('await');
    const [countDownOn, setCountDown] = useState(false);
    const [result, setResult] = useState('');


    const gameResultHandler = (result) => {
        setResult(() => result)
        // if ('success' === result) {
        //     props.onSuccess()
        // } else if ('skip' === result) {
        //     props.onSkip()
        // } else if ('timedout' === result) {
        //     props.onTimeOut()
        // }
        setGameState(() => 'over');
    }

    let gamePad = <View></View>
    if ('await' === gameState) {
        gamePad = <ReadyCheck onStart={() => {
            setGameState(() => 'on')
        }} />
    }
    else if ('on' === gameState) {
        gamePad = <JumbleSolutionPadTimed game={game} onGameResult={gameResultHandler} />
    } else if ('over' === gameState) {
        gamePad = <CorrectAnswer frame={createLettersArrayWithPosition(game.targetWord)} onPressOk={() => {
            if ('success' === result) {
                props.onSuccess()
            } else if ('skip' === result) {
                props.onSkip()
            } else if ('timedout' === result) {
                props.onTimeOut()
            }
        }} />
    }

    return (
        <View style={styles.parentContainer}>
            {gamePad}
        </View>

    )

}

export default JumbleSolutionController