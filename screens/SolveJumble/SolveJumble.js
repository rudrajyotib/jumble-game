import { View } from "react-native";
import SolutionPad from "../../components/SolutionPad";
import { styles } from "../../styles/styles";
import { JumbleController } from "../../utils/JumbleController";


function SolveJumble({ route, navigation }) {

    const { game } = route.params

    function onSkipHandler() {
        navigation.navigate('GameOver', {
            result: 'failed'
        })
    }

    function onSuccessHandler() {
        navigation.navigate('GameOver', {
            result: 'success'
        })
    }

    const jumbleController = new JumbleController(game.question, game.answer)
    let gameContent = <SolutionPad game={jumbleController} onSuccess={onSuccessHandler} onSkip={onSkipHandler} />


    return (
        <View style={styles.parentContainer}>
            {gameContent}
        </View>
    );

}


export default SolveJumble