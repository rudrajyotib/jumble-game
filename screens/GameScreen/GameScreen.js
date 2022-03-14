import { View } from "react-native"
import GamePad from "../../components/game/GamePad"
import { styles } from "../../styles/styles"

function GameScreen({ route, navigation }) {

    const gameMode = route.params

    navigation.addListener('beforeRemove', (evt) => {
        evt.preventDefault()
    })


    return (<View style={styles.parentContainer}><GamePad players={gameMode.playMode.players} /></View>)

}

export default GameScreen