// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { checkIfExistsInUsers } from "./functions/FirebaseFunctions";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

// async function addToUsers(username, email) {
//   await addDoc(collection(firestore, 'users'), {
//       username: username,
//       email: email,
//   });
// }

// async function run() {
//   try {
//     const exists = await checkIfExistsInUsers('test1', 'test1');
//     console.log(exists);
//     if(exists === false)
//      await addToUsers('test1', 'test1');
//     else console.log('user exists');

//   }
//   catch {
//     console.log('error');
//   }
// }

// run(); 

export const auth = getAuth(app);
export default app;