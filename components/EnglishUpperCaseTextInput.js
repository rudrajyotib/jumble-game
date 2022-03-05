import { useState } from "react"
import { TextInput } from "react-native";

function EnglishUpperCaseTextInput(props) {


    const [userInput, setUserInput] = useState(props.value);

    function changeHandler(text) {
        let val = text.toUpperCase().replace(/[^A-Z]/ig, '');
        setUserInput(() => {
            props.handleOnChangeTargetWord(val)
            return val
        })

    }



    return (
        <TextInput
            // onBlur={blurHandler}
            style={{ ...props.style, fontWeight: props.fontWeight }}
            onChangeText={changeHandler}
            autoCapitalize={"characters"}
            keyboardAppearance="default"
            value={props.value}
            editable={props.editable}
            maxLength={props.maxLength}
        />
    )
}

export default EnglishUpperCaseTextInput