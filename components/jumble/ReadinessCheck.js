import { Text, View } from "react-native"
import { styles } from "../../styles/styles"
import PressableButton from "../elements/PressableButton"

function ReadinessCheck(props) {

    let greetingContent = <View />
    if ('online' === props.gameMode) {
        greetingContent = <View style={{ backgroundColor: "orange", opacity: 0.9, alignItems: "center", marginBottom: 40, padding: 20 }}>
            {
                ((props.name) && ('' !== props.name)) &&
                <View >
                    <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 15, fontWeight: "400" }}>You have accepted a challenge from </Text>
                    <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 15, fontWeight: "700" }}>{props.name}.</Text>
                    <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 15, fontWeight: "400" }}>Solve in 90 seconds. </Text>
                    <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 15, fontWeight: "400" }}>Timer starts when you press solve. </Text>
                    <Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 15, fontWeight: "400" }}>Good luck! </Text>
                </View>
            }
            {/* <Text style={{ fontSize: 20, fontWeight: "normal" }}>Proceed to solve when you are ready. Good luck.</Text> */}
        </View>
    } else {
        greetingContent = <View style={{ backgroundColor: "orange", opacity: 0.9, alignItems: "center", marginBottom: 40, padding: 20 }}>
            {
                ((props.name) && ('' !== props.name)) &&
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>Hello {props.name}</Text>
            }
            <Text style={{ fontSize: 20, fontWeight: "normal" }}>Proceed to solve when you are ready. Good luck.</Text>
        </View>
    }


    return (<View style={{ flex: 1, justifyContent: "center" }}>
        {/* <View style={{ backgroundColor: "orange", opacity: 0.9, alignItems: "center", marginBottom: 40, padding: 20 }}>
            {
                ((props.name) && ('' !== props.name)) &&
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>Hello {props.name}</Text>
            }
            <Text style={{ fontSize: 20, fontWeight: "normal" }}>Proceed to solve when you are ready. Good luck.</Text>
        </View> */}
        {greetingContent}
        <View style={{ flexDirection: 'row', alignSelf: "center" }}>
            {
                ('online' === props.gameMode) && <PressableButton
                    style={{ ...styles.buttonCard, ...styles.buttonLowPriority, paddingHorizontal: 50 }}
                    buttonSize="medium"
                    disabled={false}
                    buttonLabel={'Back'}
                    textStyle={{ fontWeight: "bold", fontSize: 20 }}
                    handlerFunction={props.onBack} />
            }
            <PressableButton
                style={{ ...styles.buttonCard, ...styles.buttonPrimary, paddingHorizontal: 50 }}
                buttonSize="medium"
                disabled={false}
                buttonLabel={'Solve'}
                textStyle={{ fontWeight: "bold", fontSize: 20 }}
                handlerFunction={props.onStart} />
        </View>
    </View>)

}

export default ReadinessCheck