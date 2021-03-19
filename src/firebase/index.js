import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
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
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

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

export const resetPassword = (event, email) => {
  event.preventDefault();
  auth
    .sendPasswordResetEmail(email)
    .then(toast.success('Please check your email'))
    .catch(() => {
      toast.error('Please enter a valid email');
    });
};

export const signInEmailAndPassword = async (event, email, password) => {
  event.preventDefault();
  try {
    await auth.signInWithEmailAndPassword(email, password);
    toast.success('Good!');
  } catch (error) {
    toast.error(error.message);
  }
};

export const signUpEmailAndPassword = async (event, email, password) => {
  event.preventDefault();
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    toast.success('Create account');
  } catch (error) {
    toast.error(error.message);
  }
};

export const addTodoInList = (event, user, title, description, day) => {
  event.preventDefault();
  firestore.collection('todos').add({
    userId: user.uid,
    title: title,
    description: description,
    day: day,
    done: false,
  });
};

export const editTodoInList = (event, todo, setTodo, title, description) => {
  event.preventDefault();
  firestore.collection('todos').doc(todo.id).update({
    title: title,
    description: description,
  });
  firestore
    .collection('todos')
    .doc(todo.id)
    .get()
    .then(doc => {
      if (doc.exists)
        setTodo({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          done: doc.data().done,
        });
    })
    .then(() => {
      toast.success('Update!');
    });
};

export const deleteTodoInList = id => {
  firestore
    .collection('todos')
    .doc(id)
    .delete()
    .then(() => {
      toast.success('Deleted!');
    });
};

export const updateDone = (todo, isDone) => {
  firestore.collection('todos').doc(todo.id).update({
    done: isDone,
  });
};

export const filterCompleteTodo = () => {
  firestore
    .collection('todos')
    .where('done', '==', true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref
          .delete()
          .then(() => {
            toast.success('Document successfully deleted!');
          })
          .catch(error => {
            toast.error('Error removing document: ' + error);
          });
      });
    });
};

export const unsubscribeFirestore = (user, day, setTodos) => {
  firestore
    .collection('todos')
    .where('userId', '==', user.uid)
    .where('day', '==', day)
    .onSnapshot(snapshot => {
      setTodos(
        snapshot.docs.map(doc => {
          return {
            id: doc.id,
            date: day,
            title: doc.data().title,
            description: doc.data().description,
            done: doc.data().done,
            datatime: new Date(),
          };
        }),
      );
    });
};

export const SignOut = () => {
  auth.signOut();
};

export const saveImage = (name, canvas) => {
  // var canvas = document.querySelector("canvas");
  if (typeof canvas.toBlob !== 'undefined') {
    canvas.toBlob(function (blob) {
      let image = new Image();
      image.src = blob;
      let metadata = {
        contentType: 'image/png',
      };
      storageRef
        .child('images/' + name.displayName)
        .put(blob, metadata)
        .then(function (snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          window.location.href = 'index.html';
        })
        .catch(function (error) {
          console.error('Upload failed:', error);
        });
    });
  } else if (typeof canvas.msToBlob !== 'undefined') {
    var blob = canvas.msToBlob();
    canvas.toBlob(function () {
      let image = new Image();
      image.src = blob;
      let metadata = {
        contentType: 'image/png',
      };
      storageRef
        .child('images/' + name.displayName)
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
