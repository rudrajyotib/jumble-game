import { Text, View } from "react-native"
import { styles } from "../../styles/styles"
import { GameConstants } from "../../utils/Constants"
import PressableButton from "../elements/PressableButton"
import SingleChallenge from "../elements/SingleChallenge"
import { getAllChallengesForUser } from "../../services/ChallengeService";
import { useFocusEffect } from "@react-navigation/native"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateDuels } from "../../store/data/GameStateSlice"


function PendingChallenges(props) {


    // const [allChallenges, setAllChallenges] = useState([])
    // const [loadingQuestions, setLoadingQuestions] = useState(true)
    // const [pendingChallengesState, setPendingChallengesState] = useState({ allChallenges: [], loading: true })

    // useFocusEffect(React.useCallback(() => {
    //     getAllChallengesForUser(props.userId)
    //         .then((challengesList) => {
    //             setPendingChallengesState(() => {
    //                 return { loading: false, allChallenges: challengesList.challenges }
    //             })
    //         })
    //         .catch((err) => { })
    //     // setLoadingQuestions(() => { return false })
    //     return (() => { })
    // }, []))

    const gameState = useSelector(state => state.gameState)
    const dispatch = useDispatch()

    useFocusEffect(React.useCallback(() => {
        if (gameState.feed.duels.loaded === true) {
            console.log('data already present, not loading duels')
            props.onDataLoad()
            return
        }
        getAllChallengesForUser(gameState.authenticatedUser.uid)
            .then((response) => {
                // console.log('received response of duels::' + JSON.stringify(response))
                if (response.result === 1) {
                    dispatch(updateDuels({ duelList: response.challenges }))
                    props.onDataLoad()
                }
                else {
                    dispatch(updateDuels({ duelList: [] }))
                    props.onDataLoad()
                }
            }).catch((err) => {
                console.log('received errror response from duel search')
                dispatch(updateDuels({ duelList: [] }))
                props.onDataLoad()
            })


    }, []))

    const solveHandler = (duelId, challengeId, challenger) => {
        // console.log("Word received" + JSON.stringify(question))
        props.solveHandler(duelId, challengeId, challenger)
    }

    // const allChallenges = props.challenges
    const allChallenges = gameState.feed.duels.duelList

    // console.log('challengses::' + JSON.stringify(allChallenges))

    let gameContent = <View />
    if (allChallenges && allChallenges.length > 0) {
        let challengeContent = allChallenges.map(
            challlenge => <SingleChallenge
                key={`'challenge'${challlenge.duelId}`}
                challenger={challlenge.challenger}
                duelId={challlenge.duelId}
                challengeId={challlenge.challengeId}
                challengeDate={challlenge.challengeDate}
                solveHandler={solveHandler} />
        )

        gameContent = <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontFamily: 'RobotoMono-Italic' }}>You have challenges waiting to be attempted.</Text>
            </View>
            <View>
                {challengeContent}
            </View>
        </View>
    } else {
        gameContent = <View style={{ flex: 1, paddingTop: 100 }}>
            <View style={{ ...styles.card, margin: 50 }}>
                <Text style={{ fontFamily: 'RobotoMono-Italic' }}>  You have no pending Challenges</Text>
            </View>
        </View>
    }

    return (<View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            {gameContent}
        </View>
    </View>)

}


export default PendingChallenges