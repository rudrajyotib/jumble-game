import { useState } from "react";
import { View } from "react-native";
import { styles } from "../../styles/styles";
import { JumbleController } from "../../utils/JumbleController";
import GameOver from "../../components/game/GameOver";
import JumbleSolutionController from "../../components/jumble/JumbleSolutionController";


function SolveJumble({ route, navigation }) {

    const { game } = route.params
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
        navigation.navigate('CreateJumble', {
            result: 'failed'
        })
    }

    function onSuccessHandler() {
        if (gameOn === false) {
            return
        }
        setResult(() => 'success')
        setGameOn(() => false)

        // navigation.navigate('GameOver', {
        //     result: 'success'
        // })
        //result = 'success'
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
        <View style={styles.parentContainer}>
            {gameContent}
        </View>
    );

}


export default SolveJumble