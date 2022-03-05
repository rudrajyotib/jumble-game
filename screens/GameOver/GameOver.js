import { ImageBackground, Pressable, StyleSheet, View, Text } from "react-native";
import { styles } from "../../styles/styles";
import imageDictionary from "../../assets/images";
import PressableButton from "../../components/PressableButton";

function GameOver({ route, navigation }) {


    return (
        <View style={gameOverStyle.mainContainer}>
            <ImageBackground
                source={imageDictionary.success}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize">
                <View style={gameOverStyle.horizontalQuestionContainer}>
                    <PressableButton
                        style={gameOverStyle.buttonCard}
                        disabled={false}
                        buttonLabel={'Start Over !!!'}
                        handlerFunction={() => {
                            navigation.navigate('Home', {})
                        }} />
                </View>

            </ImageBackground >
        </View >
    )


}

gameOverStyle = StyleSheet.create
    (
        {

            mainContainer: {
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            },
            nextActionView: {
                flexDirection: "row"
            },
            horizontalQuestionContainer: {
                flexDirection: "row",
                justifyContent: "center",
                flex: 1,
                alignItems: "center",
            },
            buttonCard: {
                width: "90%",
                height: 70,
                borderColor: "green",
                borderWidth: 4,
                justifyContent: "center",
                alignItems: "center",
            }
        }
    );



export default GameOver