import { useState } from "react"
import { TextInput } from "react-native";

function EnglishLettersOnlyTextInput(props) {


    const [userInput, setUserInput] = useState(props.value);
    const upperCaseOnly = props.upperCaseOnly === true ? true : false
    let matcherExpression = /[^a-zA-Z]/ig
    if (upperCaseOnly === true) {
        matcherExpression = /[^A-Z]/ig
    }
    //upperCaseOnly

    function changeHandler(text) {
        let updatedText = upperCaseOnly ? text.toUpperCase() : text
        let val = updatedText.replace(matcherExpression, '');
        setUserInput(() => {
            props.onTextChange(val)
            return val
        })

    }



    return (
        <TextInput
            // onBlur={blurHandler}
            style={{ ...props.style, fontWeight: props.fontWeight, fontSize: 25 }}
            onChangeText={changeHandler}
            autoCapitalize={"characters"}
            keyboardAppearance="default"
            value={props.value}
            editable={props.editable}
            maxLength={props.maxLength}
        />
    )
}

export default EnglishLettersOnlyTextInput