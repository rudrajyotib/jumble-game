import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Modal, Pressable } from 'react-native';
import EnglishLettersOnlyTextInput from '../../components/elements/EnglishLettersOnlyTextInput';
import PressableButton from '../../components/elements/PressableButton';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { setLoginDetails, setGameModeOnline } from '../../store/data/GameStateSlice'
import { signIn } from '../../services/LoginService'

import { styles } from "../../styles/styles"

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
    dispatch = useDispatch()

    return (
        <View style={{ ...styles.parentContainer }, { paddingTop: 50 }}>
            <View style={styles.card}>
                <View>
                    <Text>email</Text>
                </View>
                <View>
                    <EnglishLettersOnlyTextInput
                        fontWeight={"bold"}
                        upperCaseOnly={false}
                        style={{ ...styles.input, ...{ backgroundColor: 'white', opacity: 0.8 } }}
                        onTextChange={(text) => setUserName(text)}
                        editable={true}
                        value={userName}
                        maxLength={20}
                        freeText={true}
                    />
                </View>
                <View>
                    <Text>Password</Text>
                </View>
                <View>
                    <EnglishLettersOnlyTextInput
                        fontWeight={"bold"}
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
                <View>
                    <PressableButton buttonSize="small" buttonLabel="Sign IN"
                        style={{ ...styles.buttonCard, ...styles.buttonPrimary, ...styles.sma }} handlerFunction={() => {
                            console.log('login pressed::' + userName + '::password::' + password)
                            signIn(userName, password, user => {
                                console.log("Logged In !!!!")
                                console.log(JSON.stringify(user))
                                dispatch(setLoginDetails({
                                    uid: user.user.uid,
                                    email: user.user.email,
                                    userName: user.user.displayName
                                }))
                                dispatch(setGameModeOnline())
                                navigation.navigate('Challenges', {})
                            }, error => {
                                console.log("LogIn failed")
                                console.log(JSON.stringify(error))
                            })
                            // signInWithEmailAndPassword(auth, userName, password)
                            //     .then((user) => {

                            //     }).catch((error) => {

                            //     })
                        }} />
                </View>
            </View>
        </View>
    )


}

export default SignInScreen
