import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import PendingChallenges from "../../components/game/PendingChallenges";
import { styles } from "../../styles/styles";
import { setGameModeOnline } from "../../store/data/GameStateSlice"

function ChallengeScreen({ route, navigation }) {

    const dispatch = useDispatch()
    dispatch(setGameModeOnline())

    return (<View style={{ ...styles.parentContainer, paddingTop: 40, flex: 1 }}>
        <Text>All Challenges in a place</Text>
        <PendingChallenges solveHandler={(question) => {
            navigation.navigate(
                'GameScreen',
                {
                    playMode: {
                        player_mode: "online",
                        //players: [player1, player2]
                    },
                    question: {
                        type: 'jumble',
                        question: question
                    }
                }
            )
        }} />
    </View>)


}

export default ChallengeScreen