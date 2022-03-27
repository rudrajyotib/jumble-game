import { Alert, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import GamePad from "../../components/game/GamePad"
import { resetGame } from "../../store/data/GameStateSlice"
import { styles } from "../../styles/styles"

function GameScreen({ route, navigation }) {

    const gameMode = route.params
    const gameState = useSelector(state => state.gameState)
    const dispatch = useDispatch()

    navigation.addListener('beforeRemove', (evt) => {
        evt.preventDefault()
        Alert.alert(
            'Done with it ?',
            'Do you want to leave this game?',
            [
                { text: "Don't leave", style: 'cancel', onPress: () => { } },
                {
                    text: 'End Game',
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
        gameScreenContent = <GamePad gameState={gameState} onBack={() => {
            navigation.navigate('GameMode')
        }} />
    }

    return (<View style={styles.parentContainer}>
        {gameScreenContent}
    </View>)

}

export default GameScreen