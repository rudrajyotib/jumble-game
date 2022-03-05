import { useState } from "react"
import { TextInput } from "react-native";

function EnglishUpperCaseTextInput(props) {


    const [userInput, setUserInput] = useState(props.value);

    function changeHandler(text) {
        let val = text.replace(/[^A-Z]/ig, '');
        setUserInput(() => val)
        props.handleOnChangeTargetWord(val)
    }

    return (
        <TextInput
            style={props.style}
            onChangeText={changeHandler}
            autoCapitalize="characters"
            keyboardAppearance="default"
            value={props.value}
            editable={props.editable}
            maxLength={props.maxLength}
        />
    )
}

export default EnglishUpperCaseTextInput