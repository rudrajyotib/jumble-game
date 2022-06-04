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


const contentHeaderMapping = {
    "pendingChallenges": 'Your pending challenges',
    "friends": "Friends "
}

function ChallengeScreenNew({ route, navigation }) {

    const gameMode = route.params

    const solveHandler = (duelId, challengeId) => {
        getChallengeForDuel(challengeId)
            .then((result) => {
                if (result.result === 1) {
                    navigation.navigate(
                        'GameScreen', {
                        action: 'answer',
                        playMode: { player_mode: "online" },
                        duelId: duelId,
                        challengeId: challengeId,
                        userName: gameMode.userName,
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
            playerName: gameMode.userName
        })
    }


    const [contentTarget, setContentTarget] = useState(gameMode.content)
    let gameContent = <View></View>
    if ('pendingChallenges' === gameMode.content) {
        gameContent = <View>
            <ScrollView>
                <PendingChallenges
                    userId={gameMode.userId}
                    solveHandler={solveHandler} />
            </ScrollView>
        </View>
    } else if ('friends' === gameMode.content) {
        gameContent = <ListOfFriends
            onAddChallenge={addChallengeHandler}
            userName={gameMode.userName}
            userId={gameMode.userId} />
    }

    return (<View style={{ ...styles.parentContainer, flex: 1 }}>
        <View style={{ flex: 2, backgroundColor: 'orange', alignItems: 'center' }}>
            <View style={{ paddingTop: 45 }}><Text style={{ fontWeight: '500', }}>Hi {gameMode.userName}</Text></View>
        </View>
        {/* <ImageBackground
            source={imageDictionary.createBackground}
            style={{ width: '100%', height: '100%' }}
            resizeMethod="resize" style={{ flex: 18 }}> */}
        <View style={{ flex: 18 }}>
            <View style={{ flex: 18 }}>
                {/* <View style={{ alignItems: 'center', paddingTop: 20, alignItems: 'stretch' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', opacity: 0.8, }}>
                        <Text style={{ fontSize: 16 }}>{contentHeaderMapping[gameMode.content]}</Text>
                    </View>
                </View> */}
                <View style={{ paddingTop: 10 }}>
                    {gameContent}
                </View>
            </View>

            <View style={{ flex: 2, alignSelf: 'flex-end', }}><PressableButton buttonLabel='back' style={{ ...styles.buttonLowPriority }} handlerFunction={() => {
                navigation.navigate('AuthenticatedUserHome', {})
            }} /></View>
            {/* </ImageBackground> */}
        </View>
    </View>)
}

export default ChallengeScreenNew