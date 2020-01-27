import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCv8dyunLZ2EFNiz40nQBa8gMvSxCOuLmE",
  authDomain: "crwn-clothing-db-dbe39.firebaseapp.com",
  databaseURL: "https://crwn-clothing-db-dbe39.firebaseio.com",
  projectId: "crwn-clothing-db-dbe39",
  storageBucket: "crwn-clothing-db-dbe39.appspot.com",
  messagingSenderId: "731427439268",
  appId: "1:731427439268:web:e88f79d4ccfe646a0f9c31",
  measurementId: "G-MQ19VGXJXK"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
