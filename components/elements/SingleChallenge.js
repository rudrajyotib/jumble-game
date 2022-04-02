import { Text, View } from "react-native";
import { styles } from "../../styles/styles";
import PressableButton from "./PressableButton";


function SingleChallenge(props) {


    return (<View style={{ ...styles.card }}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 8 }}>
                <View style={{ flexDirection: "column", justifyContent: "center", flex: 1, alignContent: "center", paddingLeft: 20 }}>
                    <View style={{ flexDirection: "row" }}><Text>Challenged by </Text><Text style={{ fontWeight: "bold" }}>{props.challenger}</Text></View>
                    <View><Text> on {props.challengeDate}</Text></View>
                </View>
            </View>
            <View style={{ flex: 6 }}>
                <View>
                    <PressableButton buttonSize="small" buttonLabel="Solve"
                        style={{ ...styles.buttonCard, ...styles.buttonPrimary, ...styles.sma }} handlerFunction={() => { props.solveHandler("SOMETHING") }} />
                </View>
            </View>
        </View>

    </View>)

}


export default SingleChallenge