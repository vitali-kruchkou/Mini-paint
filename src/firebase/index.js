import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/firestore';
import config from './firebaseConfig';
import toast from 'react-hot-toast';

// Check if we have already initialized an app
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();
export const storageRef = storage.ref();

const provider = new firebase.auth.GoogleAuthProvider();

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

export const resetPassword = async (event, email) => {
  event.preventDefault();
  try {
    const ok = await auth.sendPasswordResetEmail(email);
    toast.success('Please check your email!');
    return ok;
  } catch (err) {
    toast.error('Please enter a valid email');
  }
};

export const signInEmailAndPassword = async (email, password) => {
  event.preventDefault();

  const res = await auth.signInWithEmailAndPassword(email, password);
  toast.success('Good!');
  return res;
};

export const signInWithGoogle = async () => {
  event.preventDefault();

  const res = await auth.signInWithPopup(provider);
  toast.success('Good!');
  return res;
};

export const signUpEmailAndPassword = async (email, password) => {
  event.preventDefault();

  const res = await auth.createUserWithEmailAndPassword(email, password);
  toast.success('Create account');
  return res;
};

export const SignOut = async () => {
  await auth.signOut();
};

export const saveImage = (name, canvas) => {
  if (
    typeof canvas.toBlob !== 'undefined' ||
    typeof canvas.msToBlob !== 'undefined'
  ) {
    canvas.toBlob(function (blob) {
      let image = new Image();
      image.src = blob;
      let metadata = {
        contentType: 'image/png',
      };
      storageRef
        .child('images/' + name)
        .put(blob, metadata)
        .then(function (snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          window.location.href = 'index.html';
        })
        .catch(function (error) {
          console.error('Upload failed:', error);
        });
    });
  }
};

export const requestImage = () => {
  firestore
    .collection('users')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let name = 'name_1';
        console.log(doc.data());
        let title = doc.data().title;
        let signlePerson = document.createElement('div');
        signlePerson.className = 'person';
        let info = document.createElement('p');
        info.innerText = 'Name: ' + name + 'Title: ' + title;
        signlePerson.append(info);
        storageRef
          .child('images/' + name)
          .getDownloadURL()
          .then(url => {
            let img = document.createElement('img');
            img.src = url;
            signlePerson.append(img);
            console.log(signlePerson);
          });
        let gallery = document.createElement('div');
        gallery.append(signlePerson);
        document.getElementById('root').appendChild(gallery);
      });
    });
};
