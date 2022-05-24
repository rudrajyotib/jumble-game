import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import PendingChallenges from "../../components/game/PendingChallenges";
import { styles } from "../../styles/styles";
import { setGameModeOnline } from "../../store/data/GameStateSlice"
import imageDictionary from "../../assets/images";
import { useState } from "react";
import { getChallengeForDuel } from "../../services/ChallengeService";
import React from "react";
import PressableButton from "../../components/elements/PressableButton";
import ListOfFriends from "../../components/friends/ListOfFriends";
import { useSelector } from "react-redux";

function ChallengeScreen({ route, navigation }) {

    const [fetchedChallenges, setFetchedChallenges] = useState([]);
    const [challengesAreFetched, setChallengesAreFetched] = useState(true)
    const [selectedView, setSelectedView] = useState('challenges')
    const gameState = useSelector(state => state.gameState)


    const dispatch = useDispatch()
    const solveHandler = (duelId, challengeId) => {
        getChallengeForDuel(challengeId)
            .then((result) => {
                if (result.result === 1) {
                    navigation.navigate(
                        'GameScreen', { playMode: { player_mode: "online" }, question: { type: 'jumble', word: result.question.question.content.word, duelId: duelId, challengeId: challengeId } }
                    )
                }
            })
            .catch((err) => { })

    }

    dispatch(setGameModeOnline())
    var gameContent = <View></View>
    if ('challenges' === selectedView) {
        if (challengesAreFetched === true) {
            gameContent = <ScrollView>
                <PendingChallenges
                    userId={gameState.authenticatedUser.uid}
                    challenges={fetchedChallenges}
                    solveHandler={solveHandler} />
            </ScrollView>
        }
    } else if ('friends' === selectedView) {
        gameContent = <ScrollView><ListOfFriends
            userName={gameState.authenticatedUser.userName}
            userId={gameState.authenticatedUser.uid} /></ScrollView>
    }

    return (<View style={{ ...styles.parentContainer, flex: 1 }}>

        <ImageBackground
            source={imageDictionary.createBackground}
            style={{ width: '100%', height: '100%' }}
            resizeMethod="resize">
            <View style={{ flex: 1 }}>
                <View style={{ flex: 9, paddingTop: 40 }}>
                    {gameContent}
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ flex: 1, ...styles.horizontalContainer, ...{ justifyContent: "center" } }}>
                        <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="small" disabled={false} handlerFunction={() => {
                            setSelectedView(() => { return 'challenges' })
                        }} buttonLabel={'Challenges'} />
                        <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="small" disabled={false} handlerFunction={() => {
                            setSelectedView(() => { return 'friends' })
                        }} buttonLabel={'Friends'} />
                        <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="small" disabled={false} handlerFunction={() => {
                            setSelectedView(() => { return 'requests' })
                        }} buttonLabel={'Requests'} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    </View>)


}

export default ChallengeScreen