import { View } from "react-native"
import DualPlayerMode from "../../components/game/DualPlayerMode"

function GameMode({ route, navigation }) {

    function dualPlayerContinue(player1, player2) {
        navigation.navigate(
            'CreateJumble',
            {
                playMode: {
                    player_mode: "dual",
                    players: [player1, player2]
                }
            }
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <DualPlayerMode onContinue={dualPlayerContinue} />
        </View>
    )


}


export default GameMode