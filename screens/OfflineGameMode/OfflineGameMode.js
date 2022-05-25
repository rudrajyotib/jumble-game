import { View } from "react-native"
import { useDispatch } from "react-redux"
import DualPlayerMode from "../../components/game/DualPlayerMode"
import { setPlayers } from "../../store/data/GameStateSlice"

function OfflineGameMode({ route, navigation }) {



    // const dispatch = useDispatch(state => state.gameState.players)
    const dispatch = useDispatch()

    function dualPlayerContinue(player1, player2) {
        dispatch(setPlayers({ players: [player1, player2] }))
        navigation.navigate(
            'GameScreen',
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


export default OfflineGameMode