import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCjDlMeX6IrSiVBel2-PzG2oCmused2EKg",
  authDomain: "crown-db-b2051.firebaseapp.com",
  databaseURL: "https://crown-db-b2051.firebaseio.com",
  projectId: "crown-db-b2051",
  storageBucket: "crown-db-b2051.appspot.com",
  messagingSenderId: "833735036937",
  appId: "1:833735036937:web:739ff24936e73b5d4fe8d8",
  measurementId: "G-38RERL6Q4P",
};

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
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating a user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = (collectionKey, 
  objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
