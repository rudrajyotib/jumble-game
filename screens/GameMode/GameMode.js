import { ImageBackground, View } from "react-native";
import { styles } from "../../styles/styles";
import imageDictionary from "../../assets/images";
import React from "react";
import PressableButton from "../../components/elements/PressableButton";


function GameMode({ route, navigation }) {

    function proceedWithOnlineGameModeHandler() {
        navigation.navigate('Login')
    }

    function proceedWithOfflineGameModeHandler() {
        navigation.navigate('OfflineGameMode')
    }

    return (
        <View style={styles.parentContainer}>
            <ImageBackground
                source={imageDictionary.createBackground}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize">
                <View style={{ paddingTop: 180, flex: 1 }}>

                    <View style={{ flex: 8 }}>
                        {/* <View style={styles.transparentCard}> */}
                        <View>
                            <View>
                                <PressableButton handlerFunction={proceedWithOnlineGameModeHandler}
                                    style={{ ...styles.buttonCard, ...styles.buttonPrimary }}
                                    disabled={false}
                                    buttonSize="medium"
                                    buttonLabel="Online challenge" />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 8 }}>
                        <View>
                            <View>
                                <PressableButton handlerFunction={proceedWithOfflineGameModeHandler}
                                    style={{ ...styles.buttonCard, ...styles.buttonPrimary }}
                                    disabled={false}
                                    buttonSize="medium"
                                    buttonLabel="Passing the device" />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        </View>
    )
}

export default GameMode