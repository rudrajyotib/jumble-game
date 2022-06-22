import React, { useState } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import imageDictionary from "../../assets/images";
import PressableButton from "../../components/elements/PressableButton";
import ListOfFriendsNew from "../../components/friends/ListOfFriendsNew";
import PendingChallenges from "../../components/game/PendingChallenges";
import { getChallengeForDuel } from "../../services/ChallengeService";
import { styles } from "../../styles/styles";
import { headerMap } from "../../utils/Constants";


function AuthenticatedUserFeed({ route, navigation }) {

    const gameState = useSelector(state => state.gameState)

    const [pageState, setPageState] = useState({ loading: true, context: 'challenges' })
    const dataLoadedHandler = () => {
        setPageState((currentState) => {
            const newState = { ...currentState }
            newState.loading = false
            return newState
        })
    }
    const [duels, setDuels] = useState([])
    const dispatch = useDispatch()
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

    const addChallengeHandler = (duelId, userId) => {
        navigation.navigate(
            'GameScreen', {
            action: 'question',
            playMode: { player_mode: "online" },
            duelId: duelId,
            userId: userId,
            playerName: gameState.authenticatedUser.userName
        })
    }

    let content = <View />


    if ('challenges' === pageState.context) {
        content = <PendingChallenges
            // challenges={gameState.feed.duels.duelList}
            onDataLoad={dataLoadedHandler}
            solveHandler={solveHandler} />
    } else if ('friends' === pageState.context) {
        content = <ListOfFriendsNew onChallenge={addChallengeHandler} onDataLoad={dataLoadedHandler} />
    }

    return (<View style={{ ...styles.parentContainer }}>
        <ImageBackground
            source={imageDictionary.createBackground}
            style={{ width: '100%', height: '100%' }}
            resizeMethod="scale"
            style={{ flex: 18 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, alignItems: "center" }}>
                    <Text style={{ paddingTop: 40, fontFamily: 'RobotoMono-Regular', fontSize: 22 }}>
                        {headerMap[pageState.context]}
                    </Text>
                </View>
                <View style={{ flex: 16 }}>
                    <ScrollView>
                        {content}
                    </ScrollView>
                </View>
                {pageState.loading === false && <View style={{ flex: 2 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <ScrollView horizontal={true}>
                            <View>
                                <PressableButton
                                    handlerFunction={() => {
                                        if (pageState.context === 'friends') {
                                            return
                                        }
                                        setPageState((currentState) => {
                                            const newState = { ...currentState }
                                            newState.context = 'friends'
                                            newState.loading = true
                                            return newState
                                        })
                                    }}
                                    style={{ ...styles.buttonPrimary }}
                                    buttonLabel={'Challenge'} />
                            </View>
                            <View>
                                <PressableButton
                                    handlerFunction={() => {
                                        if (pageState.context === 'challenges') {
                                            return
                                        }
                                        setPageState((currentState) => {
                                            const newState = { ...currentState }
                                            newState.context = 'challenges'
                                            newState.loading = true
                                            return newState
                                        })
                                    }}
                                    style={{ ...styles.buttonPrimary }}
                                    buttonLabel={'Solve'} />
                            </View>
                            <View>
                                <PressableButton style={{ ...styles.buttonPrimary }} buttonLabel={'Friend requests'} />
                            </View>
                            <View>
                                <PressableButton style={{ ...styles.buttonPrimary }} buttonLabel={'Logout'} />
                            </View>
                        </ScrollView>
                    </View>
                </View>}
            </View>
        </ImageBackground>

    </View>)

}

export default AuthenticatedUserFeed