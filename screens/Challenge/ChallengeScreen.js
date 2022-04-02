import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import PendingChallenges from "../../components/game/PendingChallenges";
import { styles } from "../../styles/styles";
import { setGameModeOnline } from "../../store/data/GameStateSlice"
import imageDictionary from "../../assets/images";
import { GameConstants } from "../../utils/Constants";

function ChallengeScreen({ route, navigation }) {

    const dispatch = useDispatch()
    const pendingChallenges = [
        {
            gameId: 0,
            challenger: "Rudrajyoti",
            challengeDate: "31 Mar 2022",
            question: { type: GameConstants.GAME_TYPE_JUMBLE, word: "FIRST" }
        },
        {
            gameId: 1,
            challenger: "Ritojyoti",
            challengeDate: "31 Mar 2022",
            question: { type: GameConstants.GAME_TYPE_JUMBLE, word: "SECOND" }
        },
        {
            gameId: 2,
            challenger: "Ritapa",
            challengeDate: "31 Mar 2022",
            question: { type: GameConstants.GAME_TYPE_JUMBLE, word: "THIRD" }
        },
        {
            gameId: 3,
            challenger: "Devansh",
            challengeDate: "31 Mar 2022",
            question: { type: GameConstants.GAME_TYPE_JUMBLE, word: "FOURTH" }
        }
    ]

    for (var i = 4; i < 40; i++) {
        pendingChallenges.push(
            {
                gameId: i,
                challenger: "Rijuan",
                challengeDate: "31 Mar 2022",
                question: { type: GameConstants.GAME_TYPE_JUMBLE, word: "FOURTH" }
            }
        )
    }

    dispatch(setGameModeOnline())
    var gameContent = <View />
    gameContent = <ScrollView>
        <PendingChallenges
            challenges={pendingChallenges}
            // challenges={[]}
            solveHandler={(question) => {
                navigation.navigate(
                    'GameScreen',
                    {
                        playMode: {
                            player_mode: "online",
                            //players: [player1, player2]
                        },
                        question: question
                    }
                )
            }} />
    </ScrollView>

    return (<View style={{ ...styles.parentContainer, flex: 1 }}>

        <ImageBackground
            source={imageDictionary.createBackground}
            style={{ width: '100%', height: '100%' }}
            resizeMethod="resize">
            <View style={{ flex: 1, paddingTop: 40 }}>
                {gameContent}
            </View>
        </ImageBackground>
    </View>)


}

export default ChallengeScreen