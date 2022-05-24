import { Alert, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import OfflineGamePad from "../../components/game/OfflineGamePad"
import OnlineGamePad from "../../components/game/OnlineGamePad"
import { markChallengeFailure, markChallengeSuccess } from "../../services/ChallengeService"
import { resetGame } from "../../store/data/GameStateSlice"
import { styles } from "../../styles/styles"
import { GameConstants } from "../../utils/Constants"
import { GameContainer } from "../../utils/GameContainer"
import { randomiseString } from "../../utils/StringUtils"

function GameScreen({ route, navigation }) {

    const gameMode = route.params
    const gameState = useSelector(state => state.gameState)
    const dispatch = useDispatch()

    navigation.addListener('beforeRemove', (evt) => {
        if ('online' === gameState.mode) {
            return
        }
        evt.preventDefault()
        Alert.alert(
            'Done with it ?',
            'Do you want to leave this game?',
            [
                { text: "Don't leave", style: 'cancel', onPress: () => { } },
                {
                    text: 'Quit Game',
                    style: 'destructive',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => {
                        dispatch(resetGame())
                        navigation.dispatch(evt.data.action)
                    },
                },
            ]
        );
    })

    let gameScreenContent = <View></View>
    if ('offline' === gameState.mode) {

        gameScreenContent = <OfflineGamePad gameState={gameState} onBack={() => {
            navigation.navigate('GameMode')
        }} />
    }
    if ('online' === gameState.mode) {

        gameScreenContent = <OnlineGamePad
            gameOverHandler={(result) => {
                if ('success' === result) {
                    markChallengeSuccess(gameMode.question.duelId)
                } else if ('failed' === result) {
                    markChallengeFailure(gameMode.question.duelId)
                }
                navigation.navigate('Challenges', {})
            }}
            duelId={gameMode.question.duelId}
            userName={gameState.authenticatedUser.userName}
            gameContainer={new GameContainer(GameConstants.GAME_TYPE_JUMBLE, randomiseString(gameMode.question.word), gameMode.question.word)}
            gameState={gameState}
            onBack={() => {
                navigation.navigate('GameMode')
            }} />

    }

    return (<View style={styles.parentContainer}>
        {gameScreenContent}
    </View>)

}

export default GameScreen