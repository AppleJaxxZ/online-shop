import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyA4go-CBmCmMNNXVrSKAw64luRwWyw_wSA",
    authDomain: "newcrwn-95103.firebaseapp.com",
    projectId: "newcrwn-95103",
    storageBucket: "newcrwn-95103.appspot.com",
    messagingSenderId: "33829452197",
    appId: "1:33829452197:web:607de539873a148be2d04c"
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;