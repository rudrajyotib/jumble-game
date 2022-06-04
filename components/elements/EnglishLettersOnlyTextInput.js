import { useState } from "react"
import { TextInput } from "react-native";

function EnglishLettersOnlyTextInput(props) {


    const [userInput, setUserInput] = useState('');
    const upperCaseOnly = props.upperCaseOnly === true ? true : false
    const freeText = props.freeText === true ? true : false
    let matcherExpression = /[^a-zA-Z]/ig
    if (upperCaseOnly === true) {
        matcherExpression = /[^A-Z]/ig
    }
    //upperCaseOnly

    function changeHandler(text) {
        let updatedText = upperCaseOnly ? text.toUpperCase() : text
        let val = updatedText
        if (!freeText) {
            val = updatedText.replace(matcherExpression, '');
        }
        setUserInput(() => {
            props.onTextChange(val)
            return val
        })

    }

    const fontSize = props.fontSize ? props.fontSize : 25



    return (
        <TextInput
            // onBlur={blurHandler}
            style={{ ...props.style, fontWeight: props.fontWeight, fontSize: fontSize }}
            onChangeText={changeHandler}
            autoCapitalize={props.upperCaseOnly === true ? "characters" : "none"}
            keyboardAppearance="default"
            value={userInput}
            editable={props.editable}
            maxLength={props.maxLength}
            secureTextEntry={props.password}
        />
    )
}

export default EnglishLettersOnlyTextInput