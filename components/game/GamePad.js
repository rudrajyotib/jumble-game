import { useState } from "react"
import { View, Text } from "react-native"
import { ImageBackground } from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import imageDictionary from "../../assets/images";
import { styles } from "../../styles/styles"
import { GameConstants } from "../../utils/Constants";
import { GameContainer } from "../../utils/GameContainer";
import JumbleQuestionController from "../jumble/JumbleQuestionController";
import SolutionPad from "./SolutionPad";

function GamePad(props) {

    const players = props.players

    const [gameStage, setGameStage] = useState('question');
    const [gameContainer, setGameContainer] = useState(new GameContainer(GameConstants.GAME_TYPE_JUMBLE, '', ''));
    const [challenger, setChallenger] = useState(0);
    const [solver, setSolver] = useState(1);

    let gameContent = <View />
    if ('question' === gameStage) {
        gameContent =
            <View style={{ flex: 1, paddingTop: 50 }}>
                <HideWithKeyboard>
                    <View style={{ backgroundColor: 'orange', ...styles.transparentCard }}>
                        <View style={{ paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "black" }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 4 }}><Text>{players[0]}</Text></View>
                                <View style={{ flex: 6 }}><Text>{gameContainer.scores[0]}</Text></View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 4 }}><Text>{players[1]}</Text></View>
                                <View style={{ flex: 6 }}><Text>{gameContainer.scores[1]}</Text></View>
                            </View>
                        </View>
                    </View>
                </HideWithKeyboard>
                <JumbleQuestionController name={players[challenger]} onStart={(targetWord, jumbledWord) => {
                    //setGameContainer(new GameContainer(GameConstants.GAME_TYPE_JUMBLE, jumbledWord, targetWord))
                    setGameContainer((gameContainerCurrent) => {
                        let gameContainerNew = { ...gameContainerCurrent }
                        gameContainerNew.question = jumbledWord
                        gameContainerNew.answer = targetWord

                        return gameContainerNew
                    })
                    setGameStage('answer');
                }} />
            </View>
    } else if ('answer' === gameStage) {
        gameContent = <SolutionPad name={players[solver]} game={gameContainer} onGameOver={(result) => {

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

export default GamePad