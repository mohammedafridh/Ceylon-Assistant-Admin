import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from '@firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {

  apiKey: "AIzaSyD6wDMvKeUmt5nzf75baXlTSnQszVgGmMI",
  authDomain: "ceylon-assistant.firebaseapp.com",
  projectId: "ceylon-assistant",
  storageBucket: "ceylon-assistant.appspot.com",
  messagingSenderId: "1085508934061",
  appId: "1:1085508934061:web:4ba2b3ee816ceabceb2924"

  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app)
export const storage = getStorage(app)


