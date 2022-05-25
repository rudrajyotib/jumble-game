import { Text, View } from "react-native"
import { styles } from "../../styles/styles"

function ScoreSummary(props) {

    return (<View style={{ backgroundColor: 'orange', ...styles.transparentCard }}>
        <View style={{ paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "black" }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 4 }}><Text>{props.players[0]}</Text></View>
                <View style={{ flex: 6 }}><Text>{props.scores[0]}</Text></View>
            </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 4 }}><Text>{props.players[1]}</Text></View>
                <View style={{ flex: 6 }}><Text>{props.scores[1]}</Text></View>
            </View>
        </View>
    </View>)

}

export default ScoreSummary