import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { sliceArray } from "../../utils/GenericUtils";

function LettersContainer(props) {

    let maxRowLength = props.maxRowLength
    let lastRowLength = props.lettersFrame.length % maxRowLength
    if (lastRowLength == 1 || lastRowLength == 2) {
        maxRowLength = maxRowLength - 1
    }

    const slicedInput = sliceArray(props.lettersFrame, maxRowLength)


    return (
        <View>
            {
                slicedInput.map((slice, index) =>
                    <View style={styles.horizontalContainer} key={`${props.keyPrefix}${index}'OuterLayer'`}>
                        {
                            slice.map(letter => <Pressable style={{ ...styles.card, ...styles.letterCard }} key={`${props.keyPrefix}${letter.key}`}
                                disabled={props.disableCheckFunction(letter)} onPress={props.questionButtonPressHandler.bind(this, letter.key)}>
                                <Text style={styles.questionText} >{letter.value}</Text>
                            </Pressable>)
                        }
                    </View>
                )
            }
        </View>
    )
}


export default LettersContainer