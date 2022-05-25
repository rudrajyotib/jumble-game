import { Text, View } from "react-native";
import { styles } from "../../styles/styles";
import PressableButton from "./PressableButton";


function SingleFriend(props) {

    return (<View style={{ ...styles.card, backgroundColor: "orange" }}>
        <View style={{ flexDirection: "row", backgroundColor: "orange" }}>
            <View style={{ flex: 8 }}>
                <View style={{ flexDirection: "column", justifyContent: "center", flex: 1, alignContent: "center", paddingLeft: 20 }}>
                    <View style={{ flexDirection: "row" }}><Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.name}</Text></View>
                    {/* <View><Text> on {props.challengeDate}</Text></View> */}
                </View>
            </View>
            <View style={{ flex: 6 }}>
                <View>
                    <PressableButton buttonSize="small" buttonLabel="Challenge"
                        style={{ ...styles.buttonCard, ...styles.buttonPrimary, ...styles.sma }}
                        handlerFunction={() => {
                            props.challengeHandler(props.duelId, props.friendUserId, props.name)
                        }} />
                </View>
            </View>
        </View>

    </View>)

}


export default SingleFriend