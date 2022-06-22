import { useFocusEffect } from "@react-navigation/native"
import React from "react"
import { Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getAllChallengesForUser } from "../../services/ChallengeService"
import { updateDuels } from "../../store/data/GameStateSlice"
import { styles } from "../../styles/styles"
import SingleChallenge from "../elements/SingleChallenge"


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
            props.onDataLoad()
            return
        }
        getAllChallengesForUser(gameState.authenticatedUser.uid)
            .then((response) => {
                if (response.result === 1) {
                    dispatch(updateDuels({ duelList: response.challenges }))
                    props.onDataLoad()
                }
                else {
                    dispatch(updateDuels({ duelList: [] }))
                    props.onDataLoad()
                }
            }).catch((err) => {
                dispatch(updateDuels({ duelList: [] }))
                props.onDataLoad()
            })


    }, []))

    const solveHandler = (duelId, challengeId, challenger) => {
        props.solveHandler(duelId, challengeId, challenger)
    }

    const allChallenges = gameState.feed.duels.duelList


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