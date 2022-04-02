import { useState } from "react"
import { View, Text, KeyboardAvoidingView } from "react-native"
import { ImageBackground } from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import imageDictionary from "../../assets/images";
import { styles } from "../../styles/styles"
import { GameConstants } from "../../utils/Constants";
import { GameContainer } from "../../utils/GameContainer";
import PressableButton from "../elements/PressableButton";
import JumbleQuestionController from "../jumble/JumbleQuestionController";
import ScoreSummary from "./ScoreSummary";
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
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ ...styles.parentContainer }}>
                <View style={{ flex: 1, paddingTop: 50 }}>
                    < HideWithKeyboard>
                        <ScoreSummary players={gameState.players} gameContainer={gameContainer} />
                    </HideWithKeyboard>
                    <JumbleQuestionController name={gameState.players[challenger]} onStart={(targetWord, jumbledWord) => {
                        //setGameContainer(new GameContainer(GameConstants.GAME_TYPE_JUMBLE, jumbledWord, targetWord))
                        setGameContainer((gameContainerCurrent) => {
                            let gameContainerNew = { ...gameContainerCurrent }
                            gameContainerNew.question = jumbledWord
                            gameContainerNew.answer = targetWord

                            return gameContainerNew
                        })
                        setGameStage('answer');
                    }} />
                    <HideWithKeyboard>
                        <View style={{ paddingBottom: 40, alignItems: "flex-end" }}>
                            <PressableButton size="small" buttonLabel="Quit Game" style={{ ...styles.buttonLowPriority, borderWidth: 0 }} handlerFunction={() => {
                                backHandler()
                            }} />
                        </View>
                    </HideWithKeyboard>
                </View>
            </KeyboardAvoidingView>
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