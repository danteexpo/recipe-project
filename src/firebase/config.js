import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAOEafFh5Hep0QRO8vbLoL2RU6shMg44n8",
  authDomain: "recipe-project-3b89c.firebaseapp.com",
  projectId: "recipe-project-3b89c",
  storageBucket: "recipe-project-3b89c.appspot.com",
  messagingSenderId: "974391724906",
  appId: "1:974391724906:web:ab45d48b0ccc8d6dc9f313"
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }
