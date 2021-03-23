import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/firestore';
import config from './firebaseConfig';

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();
export const storageRef = storage.ref();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
