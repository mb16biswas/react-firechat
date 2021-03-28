import firebase from "firebase"

const firebaseConfig = {
  apiKey: "use your token",
  authDomain: "use your token",
  projectId: "use your token",
  storageBucket: "use your token",
  messagingSenderId: "use your token",
  appId: "use your token"
};

firebase.initializeApp(firebaseConfig)
export {firebase as fr}     

const db = firebase.firestore()

export {db}
