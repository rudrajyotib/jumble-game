import { View } from "react-native";
import SolutionPad from "../../components/SolutionPad";
import { styles } from "../../styles/styles";


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

    return (
        <View style={styles.parentContainer}>
            {
                console.log(JSON.stringify(game))
            }
            <SolutionPad game={game} onSuccess={onSuccessHandler} onSkip={onSkipHandler} />
        </View>
    );

}


export default SolveJumble