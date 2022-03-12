import { useState } from "react";
import { View } from "react-native";
import LettersContainer from "./LettersContainer";
import PressableButton from "./PressableButton";
import { styles } from "../styles/styles"
import CountDown from "react-native-countdown-component";
import JumbleSolutionPadTimed from "./JumbleSolutionPadTimed";
import ReadyCheck from "./modals/ReadyCheck";




function JumbleSolutionController(props) {

    const game = props.game

    const [questionLetters, setQuestionLetters] = useState(game.questionFrame);
    const [answerLetters, setAnswerLetters] = useState(game.answerFrame);
    const [gameState, setGameState] = useState('await');
    const [countDownOn, setCountDown] = useState(false);




    let gamePad = <View></View>
    if ('await' === gameState) {
        gamePad = <ReadyCheck onStart={() => {
            setGameState(() => 'on')
        }} />
    }
    else if ('on' === gameState) {
        gamePad = <JumbleSolutionPadTimed game={game} onSuccess={props.onSuccess} onSkip={props.onSkip} onTimeOut={props.onTimeOut} />
    }

    return (
        <View style={styles.parentContainer}>
            {gamePad}
        </View>

    )

}

export default JumbleSolutionController