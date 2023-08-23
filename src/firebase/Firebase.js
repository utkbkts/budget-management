import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAISrF3UVRms0o-iujeM7fzUEKmEr_lUbE",
  authDomain: "react-redux-toolkit-977e4.firebaseapp.com",
  projectId: "react-redux-toolkit-977e4",
  storageBucket: "react-redux-toolkit-977e4.appspot.com",
  messagingSenderId: "448907103866",
  appId: "1:448907103866:web:9898235c33d067c848b5c3"
};
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app)
  const db = getFirestore(app)
  export {
    auth,
    db
  }