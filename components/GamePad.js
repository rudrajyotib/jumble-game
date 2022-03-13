import { useState } from "react"
import { Text, View } from "react-native"
import { ImageBackground } from "react-native";
import imageDictionary from "../assets/images";
import { styles } from "../styles/styles"
import { GameConstants } from "../utils/Constants";
import { GameContainer } from "../utils/GameContainer";
import OfflineShuffler from "./OfflineShuffler";
import SolutionPad from "./SolutionPad";

function GamePad(props) {

    const [gameStage, setGameStage] = useState('question');
    const [gameContainer, setGameContainer] = useState({});
    let gameContent = <View />
    if ('question' === gameStage) {
        gameContent = <OfflineShuffler onStart={(targetWord, jumbledWord) => {
            setGameContainer(new GameContainer(GameConstants.GAME_TYPE_JUMBLE, jumbledWord, targetWord))
            setGameStage('answer');
        }} />
    } else if ('answer' === gameStage) {
        gameContent = <SolutionPad game={gameContainer} onGameOver={(result) => {
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