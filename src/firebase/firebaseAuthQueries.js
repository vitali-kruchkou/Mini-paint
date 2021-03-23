import firebase from 'firebase';
import toast from 'react-hot-toast';
import { auth, generateUserDocument } from '.';

const provider = new firebase.auth.GoogleAuthProvider();

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
  const res = await auth.signInWithEmailAndPassword(email, password);
  toast.success('Good!');
  return res;
};

export const signInWithGoogle = async () => {
  const res = await auth.signInWithPopup(provider);
  toast.success('Good!');
  return res;
};

export const signUpEmailAndPassword = async (email, password) => {
  const res = await auth.createUserWithEmailAndPassword(email, password);
  toast.success('Create account');
  return res;
};

export const SignOut = async () => {
  await auth.signOut();
};

export const createUser = async () => {
  auth.onAuthStateChanged(async userAuth => {
    const user = await generateUserDocument(userAuth);
    return user;
  });
};
