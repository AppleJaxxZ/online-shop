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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();


    //checking to see if there is already a user that matches the required login data.
    //if there isnt, create a new user using the given data requirementss
    //userRef gives us the refrence to the users data, and snapShot is used to make CRUD calls to the database
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
