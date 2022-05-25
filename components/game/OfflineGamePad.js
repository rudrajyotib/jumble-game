import { useState } from "react"
import { View } from "react-native"
import { ImageBackground } from "react-native";
import imageDictionary from "../../assets/images";
import { styles } from "../../styles/styles"
import { GameConstants } from "../../utils/Constants";
import { GameContainer } from "../../utils/GameContainer";
import QuestionPad from "../jumble/QuestionPad";
import SolutionPad from "./SolutionPad";

function OfflineGamePad(props) {

    const gameState = props.gameState
    // const players = gameState
    const backHandler = props.onBack

    const [gameStage, setGameStage] = useState('question');
    const [gameContainer, setGameContainer] = useState(new GameContainer(GameConstants.GAME_TYPE_JUMBLE, '', ''));
    const [challenger, setChallenger] = useState(0);
    const [solver, setSolver] = useState(1);

    let gameContent = <View />
    if ('question' === gameStage && 'offline' === gameState.mode) {

        gameContent =
            <QuestionPad
                showScore={true}
                players={gameState.players}
                scores={gameContainer.scores}
                playerName={gameState.players[challenger]}
                onQuestionSet={(targetWord, jumbledWord) => {
                    setGameContainer((gameContainerCurrent) => {
                        let gameContainerNew = { ...gameContainerCurrent }
                        gameContainerNew.question = jumbledWord
                        gameContainerNew.answer = targetWord

                        return gameContainerNew
                    })
                    setGameStage('answer');
                }}
                challenger={challenger}
                onBack={() => {
                    backHandler()
                }} />
    } else if ('answer' === gameStage) {
        gameContent = <SolutionPad name={gameState.players[solver]} game={gameContainer} onGameOver={(result) => {

            setGameContainer((gameContainerCurrent) => {
                let gameContainerNew = { ...gameContainerCurrent }

                if ('success' === result) {
                    gameContainerNew.scores[solver] += 1
                }

                let tempChallenger = challenger
                setChallenger(solver)
                setSolver(tempChallenger)
                return gameContainerNew
            })

            setGameStage('question')
        }} />
    }

    return (<View style={{ ...styles.parentContainer }}>
        <ImageBackground
            source={imageDictionary.createBackground}
            style={{ width: '100%', height: '100%' }}
            resizeMethod="resize">
            {gameContent}
        </ImageBackground>
    </View>)

}

export default OfflineGamePad