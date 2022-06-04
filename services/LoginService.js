import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyCuxnMwS_RVwwasp549plhb-q4AhzbLoX4",

    authDomain: "jumble-apis.firebaseapp.com",

    databaseURL: "https://jumble-apis-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "jumble-apis",

    storageBucket: "jumble-apis.appspot.com",

    messagingSenderId: "856558794185",

    appId: "1:856558794185:web:30d16a26c79197ec8a6418"

};

let app
let auth

function appProvider() {
    if (app) {
        return app
    }
    app = initializeApp(firebaseConfig)
    return app
}

function authProvider() {
    if (auth) {
        return auth
    }
    auth = getAuth(appProvider())
    return auth
}


export async function signIn(userName, password, successHandler, failureHandler) {
    signInWithEmailAndPassword(authProvider(), userName, password)
        .then((user) => {
            if (successHandler) {
                successHandler(user)
            }
        })
        .catch((err) => {
            console.log(JSON.stringify(err))
            if (failureHandler) {
                failureHandler(err)
            }
        })
}

export async function signOutUser() {
    signOut(authProvider())
}