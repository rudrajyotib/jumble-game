import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/styles";


function PressableButton(props) {

    const size = props.buttonSize

    let sizedAppearance = {}

    if (size === 'medium') {
        sizedAppearance.height = 50
        sizedAppearance.fontSize = 25
    } else if (size === 'small') {
        sizedAppearance.height = 35
        sizedAppearance.fontSize = 15
    } else if (size === 'large') {
        sizedAppearance.height = 75
        sizedAppearance.fontSize = 40
    }

    return (
        <View style={{ ...{ flexDirection: "row", justifyContent: "center", padding: 10 } }}>
            <Pressable
                style={{ ...styles.card, ...props.style, height: sizedAppearance.height }}
                disabled={props.disabled}
                onPress={props.handlerFunction}>
                <Text style={{ ...{ fontSize: sizedAppearance.fontSize }, ...props.textStyle }}>{props.buttonLabel}</Text>
            </Pressable>
        </View>
    )
}

export default PressableButton