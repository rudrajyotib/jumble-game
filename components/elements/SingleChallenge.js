import { ImageBackground, Pressable, Text, View } from "react-native";
import imageDictionary from "../../assets/images";
import { styles } from "../../styles/styles";
import PressableButton from "./PressableButton";


function SingleChallenge(props) {


    return (<View >
        {/* <ImageBackground
            source={imageDictionary.createBackground}
            opacity={0.3}
            style={{ width: '100%', height: '100%' }}
            resizeMethod="resize" style={{ flex: 18 }} > */}
        <Pressable style={{ ...styles.card, paddingVertical: 10, backgroundColor: 'plum', opacity: '0.9' }} onPress={() => { props.solveHandler(props.duelId, props.challengeId, props.challenger) }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "column", justifyContent: "center", flex: 1, alignContent: "center", paddingLeft: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 6 }}><Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 18, color: 'maroon' }}>{props.challenger}</Text></View>
                            <View style={{ flex: 4 }}><Text style={{ fontFamily: 'RobotoMono-Regular', fontSize: 18, color: 'maroon', paddingLeft: 30 }}>[1 - 2000]</Text></View>
                        </View>
                        {/* <View><Text> on {props.challengeDate}</Text></View> */}
                    </View>
                </View>
                {/* <View style={{ flex: 6 }}>
                <View>
                    <PressableButton
                        buttonSize="small" buttonLabel="attempt"
                        style={{ ...styles.buttonCard, backgroundColor: 'orange' }}
                        handlerFunction={() => { props.solveHandler(props.duelId, props.challengeId) }} />
                </View>
            </View> */}
            </View>
        </Pressable>
        {/* </ImageBackground> */}

    </View>)

}


export default SingleChallenge