import { ImageBackground, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import imageDictionary from "../../assets/images";
import PressableButton from "../../components/elements/PressableButton";
import { signOutUser } from "../../services/LoginService";
import { setGameModeOnline } from "../../store/data/GameStateSlice";
import { styles } from "../../styles/styles";

function AuthenticatedUserHome({ route, navigation }) {

    const gameState = useSelector(state => state.gameState)
    const dispatch = useDispatch()
    dispatch(setGameModeOnline())

    const backToNavigate = () => {
        navigation.navigate("AuthenticatedUserHome", {})
    }

    return (
        <View style={{ ...styles.parentContainer, flex: 1 }}>
            <View style={{ flex: 2, backgroundColor: 'orange', alignItems: 'center' }}>
                <View style={{ paddingTop: 45 }}><Text style={{ fontFamily: 'RobotoMono-MediumItalic', fontSize: 20 }}>Hi ! {gameState.authenticatedUser.userName}</Text></View>
            </View>
            <ImageBackground
                source={imageDictionary.createBackground}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize" style={{ flex: 18 }}>
                <View style={{ flex: 18, paddingTop: 50 }}>

                    <View style={{ paddingHorizontal: 15 }}>
                        <PressableButton buttonLabel='pending challenges'
                            handlerFunction={() => {
                                navigation.navigate('Challenges', {
                                    userId: gameState.authenticatedUser.uid,
                                    userName: gameState.authenticatedUser.userName,
                                    content: 'pendingChallenges'
                                })
                            }}
                            buttonSize='small'
                            style={{ ...styles.buttonCard, ...styles.buttonPrimary, flex: 1 }} />
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <PressableButton buttonLabel='friends'
                            handlerFunction={() => {
                                navigation.navigate('Challenges', {
                                    userId: gameState.authenticatedUser.uid,
                                    userName: gameState.authenticatedUser.userName,
                                    content: 'friends'
                                })
                            }}
                            buttonSize='small' style={{ ...styles.buttonCard, ...styles.buttonPrimary, flex: 1, }} />
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <PressableButton buttonLabel='pending friend requests' buttonSize='small' style={{ ...styles.buttonCard, ...styles.buttonPrimary, flex: 1 }} />
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <PressableButton buttonLabel='search a friend' buttonSize='small' style={{ ...styles.buttonCard, ...styles.buttonPrimary, flex: 1 }} />
                    </View>

                </View>
                <View style={{ flex: 2, alignSelf: 'flex-end' }}>
                    <View>
                        <PressableButton buttonLabel='Logout'
                            handlerFunction={
                                () => {
                                    signOutUser()
                                    navigation.navigate('GameMode', {})
                                }
                            }
                            buttonSize='small' style={{ ...styles.buttonCard, ...styles.buttonLowPriority }} />
                    </View>
                </View>
            </ImageBackground>

        </View>
    )
}

export default AuthenticatedUserHome