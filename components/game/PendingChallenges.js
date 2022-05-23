import { Text, View } from "react-native"
import { styles } from "../../styles/styles"
import { GameConstants } from "../../utils/Constants"
import PressableButton from "../elements/PressableButton"
import SingleChallenge from "../elements/SingleChallenge"
import { getAllChallengesForUser } from "../../services/ChallengeService";
import { useFocusEffect } from "@react-navigation/native"
import React, { useState } from "react"


function PendingChallenges(props) {


    // const [allChallenges, setAllChallenges] = useState([])
    // const [loadingQuestions, setLoadingQuestions] = useState(true)
    const [pendingChallengesState, setPendingChallengesState] = useState({ allChallenges: [], loading: true })

    useFocusEffect(React.useCallback(() => {
        console.log('focus effect called')
        getAllChallengesForUser(props.userId)
            .then((challengesList) => {
                console.log('received response from service::' + JSON.stringify(challengesList))
                setPendingChallengesState(() => {
                    return { loading: false, allChallenges: challengesList.challenges }
                })
            })
            .catch((err) => {
                console.log('received error from service' + err)
            })
        // setLoadingQuestions(() => { return false })
        return (() => { })
    }, []))

    const solveHandler = (duelId, challengeId) => {
        // console.log("Word received" + JSON.stringify(question))
        props.solveHandler(duelId, challengeId)
    }

    console.log('received userId as::' + props.userId)

    // const allChallenges = await getAllChallengesForUser(props.userId)
    console.log('received challenges for user::' + JSON.stringify(pendingChallengesState.allChallenges))


    let gameContent = <View />
    if (pendingChallengesState.allChallenges && pendingChallengesState.allChallenges.length > 0) {
        gameContent = pendingChallengesState.allChallenges.map(
            challlenge => <SingleChallenge
                key={`'challenge'${challlenge.duelId}`}
                challenger={challlenge.challenger}
                duelId={challlenge.duelId}
                challengeId={challlenge.challengeId}
                challengeDate={challlenge.challengeDate}
                solveHandler={solveHandler} />
            // question={{ ...challlenge.question, questionId: challlenge.gameId }}

        )
    } else {
        if (false === pendingChallengesState.loading) {
            gameContent = <View style={{ flex: 1, paddingTop: 100 }}>
                <View style={{ ...styles.card, margin: 50 }}>
                    <Text>  You have no pending Challenges</Text>
                </View>
                <View style={{ margin: 50 }}>
                    <PressableButton sbuttonSize='large' buttonLabel='Go Back' style={{ ...styles.buttonCard, ...styles.buttonPrimary }} />
                </View>
            </View>
        } else {
            gameContent = <View>
                <Text>Loading challenges</Text>
            </View>
        }
    }

    return (<View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            {gameContent}
        </View>
    </View>)

}


export default PendingChallenges