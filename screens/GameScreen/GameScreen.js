import { Alert, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import OfflineGamePad from "../../components/game/OfflineGamePad"
import OnlineGamePad from "../../components/game/OnlineGamePad"
import { addChallenge } from "../../services/ChallengeService"
import { resetGame } from "../../store/data/GameStateSlice"
import { styles } from "../../styles/styles"

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
            onFinishNavigator={() => { navigation.navigate('Challenges', {}) }}
            currentGame={gameMode}
            onBack={() => {
                navigation.navigate('Challenges')
            }}
            onQuestionSet={(targetWord, jumbledWord) => {
                addChallenge(gameMode.duelId, gameMode.userId, { question: { type: 'JUMBLE', content: { word: targetWord } } })
                    .then(() => {
                        navigation.navigate('Challenges')
                    })
            }} />

    }

    return (<View style={styles.parentContainer}>
        {gameScreenContent}
    </View>)

}

export default GameScreen