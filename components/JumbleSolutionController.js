import { useState } from "react";
import { View } from "react-native";
import { styles } from "../styles/styles"
import JumbleSolutionPadTimed from "./JumbleSolutionPadTimed";
import CorrectAnswer from "./modals/CorrectAnswer";
import { createLettersArrayWithPosition } from "../utils/StringUtils";
import ReadinessCheck from "./ReadinessCheck";

function JumbleSolutionController(props) {
    const game = props.game
    const [gameState, setGameState] = useState('await');
    const [result, setResult] = useState('');
    const gameResultHandler = (result) => {
        setResult(() => result)
        setGameState(() => 'over');
    }

    let jumbleAnswerArea = <View></View>
    if ('await' === gameState) {
        jumbleAnswerArea = <ReadinessCheck onStart={() => {
            setGameState('on')
        }} />
    }
    else if ('on' === gameState) {
        jumbleAnswerArea = <JumbleSolutionPadTimed game={game} onGameResult={gameResultHandler} />
    } else if ('over' === gameState) {
        jumbleAnswerArea = <CorrectAnswer frame={createLettersArrayWithPosition(game.targetWord)} onPressOk={() => {
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
            {jumbleAnswerArea}
        </View>

    )

}

export default JumbleSolutionController