import { useState } from "react";
import { View } from "react-native";
import { styles } from "../../styles/styles"
import JumbleSolutionPadTimed from "./JumbleSolutionPadTimed";
import { createLettersArrayWithPosition } from "../../utils/StringUtils";
import ReadinessCheck from "./ReadinessCheck";
import CorrectAnswer from "../modals/CorrectAnswer";

function JumbleSolutionController(props) {
    const game = props.game
    const [gameState, setGameState] = useState('await');
    const [result, setResult] = useState('');
    const gameResultHandler = (result) => {
        setResult(() => result)
        setGameState(() => 'over');
        if ('success' === result) {
            props.onSuccess()
        }
    }

    let jumbleAnswerArea = <View></View>
    if ('await' === gameState) {
        jumbleAnswerArea = <ReadinessCheck name={props.name} onStart={() => {
            if ('online' === props.gameMode && props.attemptHandler) {
                props.attemptHandler()
            }
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