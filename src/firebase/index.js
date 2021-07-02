import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIRESTORE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIRESTORE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIRESTORE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIRESTORE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIRESTORE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIRESTORE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIRESTORE_MEASUREMENT_ID}`
};


firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

export default { firebase, db };