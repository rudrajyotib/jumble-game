import { Text, View } from "react-native";
import { styles } from "../styles/styles";
import EnglishLettersOnlyTextInput from "./elements/EnglishLettersOnlyTextInput";

function PlayerName(props) {
    return (<View>
        <View style={{ ...styles.transparentCard, flexDirection: "row" }}>
            {/* <View style={{
                ...styles.transparentCard, borderRadius: 7, backgroundColor: "orange", opacity: 0.9,
                justifyContent: "center", marginTop: 30, marginBottom: 20, marginHorizontal: 12,
                flex: 3
            }}> */}
            <View style={{
                opacity: 0.9,
                justifyContent: "center", marginLeft: 10,
                flex: 3
            }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 2 }}>{props.caption}</Text>
            </View>
            <View style={{ flex: 10, justifyContent: "center" }}>
                <EnglishLettersOnlyTextInput
                    fontSize={18}
                    fontWeight={"bold"}
                    upperCaseOnly={false}
                    style={{ ...styles.input, height: 50, ...{ backgroundColor: 'white', opacity: 0.6 } }}
                    onTextChange={props.onTextChange}
                    editable={true}
                    //value={''}
                    maxLength={10}
                />
            </View>
        </View>
    </View>)
}


export default PlayerName