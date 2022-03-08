import { View } from "react-native";
import OfflineShuffler from "../../components/OfflineShuffler";
import { GameController } from "../../utils/GameController";

function CreateJumble({ route, navigation }) {

    let shufflerContent = <OfflineShuffler onStart={(targetWord, jumbledWord) => {
        navigation.navigate('SolveJumble', {
            targetWord: targetWord,
            jumbledWord: jumbledWord,
            game: new GameController(jumbledWord, targetWord)
        })
    }} />

    return (
        <View style={{ flex: 1 }}>
            {shufflerContent}
        </View>
    )

}


export default CreateJumble