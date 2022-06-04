import { useFocusEffect } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import React from "react";
import { useState } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import imageDictionary from "../../assets/images";
import PressableButton from "../../components/elements/PressableButton";
import PendingChallenges from "../../components/game/PendingChallenges";
import { getAllChallengesForUser, getAllChallengesForUserCacheEnabled, getChallengeForDuel } from "../../services/ChallengeService";
import { signOutUser } from "../../services/LoginService";
import { setGameModeOnline, updateDuels } from "../../store/data/GameStateSlice";
import { styles } from "../../styles/styles";


function AuthenticatedUserFeed({ route, navigation }) {

    const gameState = useSelector(state => state.gameState)
    const [loading, setLoading] = useState({ loading: true })
    const dataLoadedHandler = () => {
        setLoading(() => { return false })
    }
    // const loading = gameState.feed.duels.loaded === true
    const [duels, setDuels] = useState([])
    const dispatch = useDispatch()
    // console.log('gameState as received::' + JSON.stringify(gameState))
    const solveHandler = (duelId, challengeId, challenger) => {
        getChallengeForDuel(challengeId)
            .then((result) => {
                if (result.result === 1) {
                    navigation.navigate(
                        'GameScreen', {
                        action: 'answer',
                        playMode: { player_mode: "online" },
                        duelId: duelId,
                        challengeId: challengeId,
                        challenger: challenger,
                        userName: gameState.authenticatedUser.userName,
                        question: {
                            type: 'jumble',
                            word: result.question.question.content.word, duelId: duelId, challengeId: challengeId
                        }
                    }
                    )
                }
            })
            .catch((err) => { })
    }


    return (<View style={{ ...styles.parentContainer }}>
        <ImageBackground
            source={imageDictionary.createBackground}
            style={{ width: '100%', height: '100%' }}
            resizeMethod="scale"
            style={{ flex: 18 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, alignItems: "center" }}><Text style={{ paddingTop: 40, fontFamily: 'RobotoMono-Regular', fontSize: 22 }}>{gameState.authenticatedUser.userName}</Text></View>
                <View style={{ flex: 16 }}>
                    <ScrollView>
                        <PendingChallenges
                            // challenges={gameState.feed.duels.duelList}
                            onDataLoad={dataLoadedHandler}
                            solveHandler={solveHandler} />
                    </ScrollView>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <PressableButton style={{ ...styles.buttonPrimary }} buttonLabel={'challenge a friend'} />
                        </View>
                        <View>
                            <PressableButton style={{ ...styles.buttonPrimary }} buttonLabel={'add friend'} />
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>

    </View>)

}

export default AuthenticatedUserFeed