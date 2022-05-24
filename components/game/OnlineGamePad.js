import { GameConstants } from "../../utils/Constants"
import { GameContainer } from "../../utils/GameContainer"
import SolutionPad from "./SolutionPad"
import { View, Text, KeyboardAvoidingView } from "react-native"
import { ImageBackground } from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import imageDictionary from "../../assets/images";
import { styles } from "../../styles/styles"
import { markChallengeAttempted } from "../../services/ChallengeService";


function OnlineGamePad(props) {

    function attemptHandler() {
        markChallengeAttempted(props.duelId)
    }


    var gameContent = <SolutionPad
        name={props.userName}
        game={props.gameContainer}
        duelId={props.duelId}
        gameMode='online'
        attemptHandler={attemptHandler}
        onGameOver={props.gameOverHandler} />

    return (

        (<View style={{ ...styles.parentContainer }}>
            <ImageBackground
                source={imageDictionary.createBackground}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize">
                {gameContent}
            </ImageBackground>
        </View>
        )
    )


}

export default OnlineGamePad