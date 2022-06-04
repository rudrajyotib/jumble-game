import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Modal, Pressable, ImageBackground } from 'react-native';
import EnglishLettersOnlyTextInput from '../../components/elements/EnglishLettersOnlyTextInput';
import PressableButton from '../../components/elements/PressableButton';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { setLoginDetails, setGameModeOnline } from '../../store/data/GameStateSlice'
import { signIn } from '../../services/LoginService'

import { styles } from "../../styles/styles"
import { getEmailForUserId } from '../../services/UserService';
import imageDictionary from '../../assets/images';

const firebaseConfig = {

    apiKey: "AIzaSyCuxnMwS_RVwwasp549plhb-q4AhzbLoX4",

    authDomain: "jumble-apis.firebaseapp.com",

    databaseURL: "https://jumble-apis-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "jumble-apis",

    storageBucket: "jumble-apis.appspot.com",

    messagingSenderId: "856558794185",

    appId: "1:856558794185:web:30d16a26c79197ec8a6418"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

function SignInScreen({ route, navigation }) {


    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginResult, setLoginResult] = useState({ code: 0, message: '' })
    const [signingInProgress, setSigningInProgress] = useState(false)
    const dispatch = useDispatch()

    return (
        <View style={{ ...styles.parentContainer }}>
            <ImageBackground
                source={imageDictionary.signInBackground}
                style={{ width: '100%', height: '100%' }}
                resizeMethod="resize">
                <View style={{ flex: 1, paddingTop: 150 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3 }}>
                            <Text style={{ fontSize: 18, fontFamily: 'RobotoMono-MediumItalic', opacity: 1 }}>User Id</Text>
                        </View>
                        <View style={{ flex: 9 }}>
                            <EnglishLettersOnlyTextInput
                                fontSize={18}
                                // fontWeight={"bold"}
                                upperCaseOnly={false}
                                style={{ ...styles.input, ...{ backgroundColor: 'white', opacity: 0.8 } }}
                                onTextChange={(text) => setUserName(text)}
                                editable={true}
                                value={userName}
                                maxLength={20}
                                freeText={true}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3 }}>
                            <Text style={{ fontFamily: 'RobotoMono-MediumItalic', fontWeight: 'bold', fontSize: 18 }}>Password</Text>
                        </View>
                        <View style={{ flex: 9 }}>
                            <EnglishLettersOnlyTextInput
                                fontSize={18}
                                // fontWeight={"bold"}
                                upperCaseOnly={false}
                                style={{ ...styles.input, ...{ backgroundColor: 'white', opacity: 0.8 } }}
                                onTextChange={(text) => setPassword(text)}
                                editable={true}
                                value={password}
                                maxLength={20}
                                password={true}
                                freeText={true}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 3 }}>
                        <PressableButton buttonSize="small" buttonLabel="Sign In" disabled={signingInProgress === true}
                            style={{ ...styles.buttonCard, ...styles.buttonPrimary, ...styles.small, backgroundColor: 'mediumorchid' }} handlerFunction={() => {
                                setSigningInProgress(() => { return true })
                                getEmailForUserId(userName)
                                    .then((result) => {
                                        if (result.found === true) {
                                            signIn(result.email, password, user => {
                                                dispatch(setLoginDetails({
                                                    uid: user.user.uid,
                                                    email: user.user.email,
                                                    userName: user.user.displayName
                                                }))
                                                dispatch(setGameModeOnline())
                                                navigation.navigate('AuthenticatedUserFeed', {})
                                                setSigningInProgress(() => { return false })
                                            }, error => {
                                                setSigningInProgress(() => { return false })
                                                setLoginResult(() => { return { code: -1, message: 'Combination of user Id and password is not correct' } })
                                            })
                                        } else {
                                            setSigningInProgress(() => { return false })
                                            setLoginResult(() => { return { code: -1, message: 'User ID not found in system' } })
                                        }
                                    }).catch(() => {
                                        setSigningInProgress(() => { return false })
                                        setLoginResult(() => { return { code: -1, message: 'Could not login' } })
                                    })
                            }} />
                    </View>
                    <View style={{ paddingTop: 30, flex: 10 }}>
                        {(loginResult.code == -1) && <View>
                            <Text style={{ fontStyle: 'italic', color: 'red', fontSize: 20, fontWeight: 'bold', paddingLeft: 20, backgroundColor: 'orange' }}>{loginResult.message}</Text>
                        </View>}
                    </View>
                </View>
            </ImageBackground>
        </View>
    )


}

export default SignInScreen
