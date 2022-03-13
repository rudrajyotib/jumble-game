import { View } from "react-native"
import GamePad from "../../components/game/GamePad"
import { styles } from "../../styles/styles"

function GameScreen({ route, navigation }) {

    return (<View style={styles.parentContainer}><GamePad /></View>)

}

export default GameScreen