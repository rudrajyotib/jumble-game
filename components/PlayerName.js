import { Text, View } from "react-native";
import { styles } from "../styles/styles";
import EnglishLettersOnlyTextInput from "./elements/EnglishLettersOnlyTextInput";

function PlayerName(props) {
    return (<View>
        <View style={{ ...styles.transparentCard }}>
            <View style={{
                ...styles.transparentCard, borderRadius: 7, backgroundColor: "orange", opacity: 0.9,
                alignItems: "center", marginTop: 30, marginBottom: 20, padding: 10, marginHorizontal: 12
            }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.caption}</Text>
            </View>
            <View >
                <EnglishLettersOnlyTextInput
                    fontWeight={"bold"}
                    upperCaseOnly={false}
                    style={{ ...styles.input, ...{ backgroundColor: 'white', opacity: 0.6 } }}
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