import { Text, View } from "react-native"
import { styles } from "../../styles/styles"
import PressableButton from "../elements/PressableButton"

function ReadinessCheck(props) {

    return (<View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ backgroundColor: "orange", opacity: 0.9, alignItems: "center", marginBottom: 40, padding: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Press Solve when you are ready. Good luck.</Text>
        </View>
        <PressableButton
            style={{ ...styles.buttonCard, ...styles.buttonPrimary, paddingHorizontal: 50 }}
            buttonSize="large"
            disabled={false}
            buttonLabel={'SOLVE'}
            textStyle={{ fontWeight: "bold", fontSize: 20 }}
            handlerFunction={props.onStart} />
    </View>)

}

export default ReadinessCheck