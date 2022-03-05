import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";


function PressableButton(props) {
    return (
        <View style={{ ...{ flexDirection: "row", justifyContent: "center", padding: 10 } }}>
            <Pressable
                style={{ ...props.style, ...styles.card }}
                disabled={props.disabled}
                onPress={props.handlerFunction}>
                <Text>{props.buttonLabel}</Text>
            </Pressable>
        </View>
    )
}

export default PressableButton