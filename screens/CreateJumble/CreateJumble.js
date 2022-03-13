import { View } from "react-native";
import OfflineShuffler from "../../components/jumble/OfflineShuffler";
import { GameConstants } from "../../utils/Constants";
import { GameContainer } from "../../utils/GameContainer";

function CreateJumble({ route, navigation }) {

    let shufflerContent = <OfflineShuffler onStart={(targetWord, jumbledWord) => {
        navigation.navigate('SolveJumble', {
            targetWord: targetWord,
            jumbledWord: jumbledWord,
            game: new GameContainer(GameConstants.GAME_TYPE_JUMBLE, jumbledWord, targetWord)
        })
    }} />

    return (
        <View style={{ flex: 1 }}>
            {shufflerContent}
        </View>
    )

}


export default CreateJumble