import { Text, View } from "react-native"
import { styles } from "../../styles/styles"
import { GameConstants } from "../../utils/Constants"
import PressableButton from "../elements/PressableButton"
import SingleChallenge from "../elements/SingleChallenge"


function PendingChallenges(props) {

    const solveHandler = (question) => {
        console.log("Word received" + JSON.stringify(question))
        props.solveHandler(question)
    }

    let gameContent = <View />
    if (props.challenges && props.challenges.length > 0) {
        gameContent = props.challenges.map(
            challlenge => <SingleChallenge
                key={`'challenge'${challlenge.gameId}`}
                challenger={challlenge.challenger}
                challengeDate={challlenge.challengeDate}
                solveHandler={solveHandler}
                question={challlenge.question} />
        )
    } else {
        gameContent = <View style={{ flex: 1, paddingTop: 100 }}>
            <View style={{ ...styles.card, margin: 50 }}>
                <Text>  You have no pending Challenges</Text>
            </View>
            <View style={{ margin: 50 }}>
                <PressableButton sbuttonSize='large' buttonLabel='Go Back' style={{ ...styles.buttonCard, ...styles.buttonPrimary }} />
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