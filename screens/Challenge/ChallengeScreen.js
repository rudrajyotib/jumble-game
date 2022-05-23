import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import PendingChallenges from "../../components/game/PendingChallenges";
import { styles } from "../../styles/styles";
import { setGameModeOnline } from "../../store/data/GameStateSlice"
import imageDictionary from "../../assets/images";
import { GameConstants } from "../../utils/Constants";
import { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { getAllChallenges, getChallengeForDuel } from "../../services/ChallengeService";
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
                    console.log("Received question in handler from service::" + JSON.stringify(result))
                    navigation.navigate(
                        'GameScreen', { playMode: { player_mode: "online" }, question: { type: 'jumble', word: result.question.question.content.word, duelId: duelId, challengeId: challengeId } }
                    )
                }
            })
            .catch((err) => {
                console.log('error getting question from service' + err)
            })

    }

    console.log('rendering challenge screen')
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
        gameContent = <ScrollView><ListOfFriends /></ScrollView>
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
                            console.log('challenges clicked')
                            setSelectedView(() => { return 'challenges' })
                        }} buttonLabel={'Challenges'} />
                        <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="small" disabled={false} handlerFunction={() => {
                            console.log('friends clicked')
                            setSelectedView(() => { return 'friends' })
                        }} buttonLabel={'Friends'} />
                        <PressableButton style={{ ...styles.buttonCard, ...styles.buttonPrimary }} buttonSize="small" disabled={false} handlerFunction={() => {
                            console.log('requests clicked')
                            setSelectedView(() => { return 'requests' })
                        }} buttonLabel={'Requests'} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    </View>)


}

export default ChallengeScreen