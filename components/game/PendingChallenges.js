import { View } from "react-native"
import SingleChallenge from "../elements/SingleChallenge"


function PendingChallenges(props) {

    const solveHandler = (word) => {
        console.log("Word received" + word)
        props.solveHandler(word)
    }


    return (<View style={{ flex: 1 }}>
        <View>
            <SingleChallenge challenger="tester" challengeDate="31 Mar 2022" solveHandler={solveHandler} />
            <SingleChallenge challenger="tester" challengeDate="31 Mar 2022" solveHandler={solveHandler} />
        </View>
    </View>)

}


export default PendingChallenges