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

    const solveHandler = (duelId, challengeId, challenger) => {
        // console.log("Word received" + JSON.stringify(question))
        props.solveHandler(duelId, challengeId, challenger)
    }

    const allChallenges = props.challenges


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