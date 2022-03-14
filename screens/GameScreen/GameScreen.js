import { Alert, View } from "react-native"
import GamePad from "../../components/game/GamePad"
import { styles } from "../../styles/styles"

function GameScreen({ route, navigation }) {

    const gameMode = route.params

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
                    onPress: () => navigation.dispatch(evt.data.action),
                },
            ]
        );
    })

    return (<View style={styles.parentContainer}><GamePad players={gameMode.playMode.players} onBack={() => {
        navigation.navigate('GameMode')
    }} /></View>)

}

export default GameScreen