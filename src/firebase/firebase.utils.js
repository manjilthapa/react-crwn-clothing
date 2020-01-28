import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyA8mVTOdi-HwLba63k_ivjxM1181VL_Gj4",
    authDomain: "crwn-clothing-a74ab.firebaseapp.com",
    databaseURL: "https://crwn-clothing-a74ab.firebaseio.com",
    projectId: "crwn-clothing-a74ab",
    storageBucket: "crwn-clothing-a74ab.appspot.com",
    messagingSenderId: "222907157495",
    appId: "1:222907157495:web:8cd912e51ed524021c7cf2",
    measurementId: "G-L63ZZQHLTC"
}
export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return
    
    //query to firestore
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    //console.log(snapShot)
    //if not exists create userRef
    if(!snapShot.exists){
        const {displayName, email} = userAuth
        const createAt = new Date()
        try{
            await userRef.set({displayName, email, createAt, ...additionalData})

        }catch(error){
            console.log("Error ",  error.message)
        }
    }

    return userRef
    
}


firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase