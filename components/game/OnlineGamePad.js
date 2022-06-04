import { GameConstants } from "../../utils/Constants"
import { GameContainer } from "../../utils/GameContainer"
import SolutionPad from "./SolutionPad"
import { View, Text, KeyboardAvoidingView } from "react-native"
import { ImageBackground } from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import imageDictionary from "../../assets/images";
import { styles } from "../../styles/styles"
import { markChallengeAttempted, markChallengeFailure, markChallengeSuccess } from "../../services/ChallengeService";
import QuestionPad from "../jumble/QuestionPad";
import { randomiseString } from "../../utils/StringUtils";


function OnlineGamePad(props) {

    function attemptHandler() {
        markChallengeAttempted(props.currentGame.question.duelId)
    }

    var gameContent = <View></View>

    if ('answer' === props.currentGame.action) {
        gameContent = <SolutionPad
            name={props.currentGame.challenger}
            game={new GameContainer(GameConstants.GAME_TYPE_JUMBLE, randomiseString(props.currentGame.question.word), props.currentGame.question.word)}
            duelId={props.currentGame.duelId}
            gameMode='online'
            onBack={() => { props.onBack() }}
            attemptHandler={attemptHandler}
            onGameOver={(result) => {
                if ('success' === result) {
                    markChallengeSuccess(props.currentGame.question.duelId)
                } else if ('failed' === result) {
                    markChallengeFailure(props.currentGame.question.duelId)
                }
                props.onFinishNavigator()
            }} />
    } else if ('question' === props.currentGame.action) {
        gameContent = <QuestionPad
            showScore={false}
            playerName={props.currentGame.playerName}
            onQuestionSet={(targetWord, jumbledWord) => { props.onQuestionSet(targetWord, jumbledWord) }}
            onBack={() => { props.onBack() }} />
    }

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