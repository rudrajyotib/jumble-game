import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import PendingChallenges from "../../components/game/PendingChallenges";
import { styles } from "../../styles/styles";
import { setGameModeOnline } from "../../store/data/GameStateSlice"
import imageDictionary from "../../assets/images";
import { GameConstants } from "../../utils/Constants";
import { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { getAllChallenges } from "../../services/ChallengeService";
import React from "react";
import PressableButton from "../../components/elements/PressableButton";


function GameMode({ route, navigation }) {

    function proceedWithOnlineGameModeHandler() {
        console.log('online button pressed')
        navigation.navigate('Login')
    }

    function proceedWithOfflineGameModeHandler() {
        console.log('offline button pressed')
        navigation.navigate('OfflineGameMode')
    }

    return (
        <View style={styles.parentContainer}>
            <ImageBackground
                source={imageDictionary.createBackground}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize">
                <View style={{ paddingTop: 50, flex: 1 }}>
                    <View style={{ flex: 4 }}>
                        <View style={styles.card}>
                            <View>
                                <Text>Welcome to Jumble Game</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 8 }}>
                        <View style={styles.transparentCard}>
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
                        <View style={styles.transparentCard}>
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