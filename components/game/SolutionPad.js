import { useState } from "react"
import { View } from "react-native"
import { styles } from "../../styles/styles"
import { JumbleController } from "../../utils/JumbleController"
import GameOver from "./GameOver"
import JumbleSolutionController from "../jumble/JumbleSolutionController"

function SolutionPad(props) {

    const game = props.game
    const [gameOn, setGameOn] = useState(true)
    const [result, setResult] = useState('')

    function onSkipHandler() {
        if (gameOn === false) {
            return
        }
        setResult(() => 'failed')
        setGameOn(() => false)
    }

    function onTimeOutHandler() {
        if (gameOn === false) {
            return
        }
        setResult(() => 'failed')
        setGameOn(() => false)
    }

    function onContinueGameOver() {
        props.onGameOver(result)
    }

    function onSuccessHandler() {
        if (gameOn === false) {
            return
        }
        setResult(() => 'success')
        setGameOn(false)

    }

    const jumbleController = new JumbleController(game.question, game.answer)
    let gameContent = <View></View>
    {
        if (gameOn === true) {
            gameContent = <JumbleSolutionController game={jumbleController} onSuccess={onSuccessHandler} onSkip={onSkipHandler} onTimeOut={onTimeOutHandler} />
        } else {
            gameContent = <GameOver onContinueGameOver={onContinueGameOver} result={result} />
        }
    }


    return (
        <View style={{ ...styles.parentContainer, flex: 1 }}>
            {gameContent}
        </View>
    );



}

export default SolutionPad