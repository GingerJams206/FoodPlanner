import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC8fIDfTlUlD7LWH48-vjvWbxSBLeuTsQ4",
    authDomain: "fir-recipe-react-app.firebaseapp.com",
    projectId: "fir-recipe-react-app",
    storageBucket: "fir-recipe-react-app.appspot.com",
    messagingSenderId: "1003530158843",
    appId: "1:1003530158843:web:41317d4f51cdc1275e665e",
    measurementId: "G-LLTX7LL9V5"
};


firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

export default {firebase, db};