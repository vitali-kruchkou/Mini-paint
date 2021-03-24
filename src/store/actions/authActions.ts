import {
  RESET_PASSW,
  SIGN_ERROR,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from './constans.d';
import allActions from '.';
import { AppDispatch, AuthActions, User } from 'type/types';

import toast from 'react-hot-toast';
import {
  resetPassword,
  signInEmailAndPassword,
  signInWithGoogle,
  SignOut,
  signUpEmailAndPassword,
} from '@firebaseConfig/firebaseAuthQueries';

const signIn = (user: User | null): AuthActions => {
  return {
    type: SIGN_IN,
    payload: user,
  };
};

const signUp = (user: User | null) => {
  return {
    type: SIGN_UP,
    payload: user,
  };
};

const signOut = (): AuthActions => {
  return {
    type: SIGN_OUT,
  };
};

const reset_passw = (): AuthActions => {
  return {
    type: RESET_PASSW,
  };
};

const sign_error = (): AuthActions => {
  return {
    type: SIGN_ERROR,
  };
};

const signin = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    signInEmailAndPassword(email, password)
      .then(({ user }: any) => {
        if (user !== undefined) {
          const { uid, email } = user;
          dispatch(allActions.authActions.signIn({ uid, email }));
        }
      })
      .catch(({ message }) => {
        toast.error(message);
        dispatch(allActions.authActions.sign_error());
      });
  };
};

const signout = () => {
  return (dispatch: AppDispatch) => {
    SignOut().then(() => {
      dispatch(allActions.authActions.signOut());
    });
  };
};

const signup = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    signUpEmailAndPassword(email, password)
      .then(({ user }: any) => {
        const { uid, email } = user;
        dispatch(allActions.authActions.signUp({ uid, email }));
      })
      .catch(({ message }) => {
        toast.error(message);
        dispatch(allActions.authActions.sign_error());
      });
  };
};

const signInGoogle = () => {
  return (dispatch: AppDispatch) => {
    signInWithGoogle().then(({ user }: any) => {
      const { uid, email } = user;
      dispatch(allActions.authActions.signIn({ uid, email }));
    });
  };
};

const resetPassw = (email: string) => {
  return (dispatch: AppDispatch) => {
    resetPassword(email)
      .then(() => {
        dispatch(allActions.authActions.reset_passw());
      })
      .catch(({ message }) => {
        toast.error(message);
        dispatch(allActions.authActions.sign_error());
      });
  };
};

export default {
  signIn,
  signOut,
  signUp,
  reset_passw,
  signin,
  signout,
  signup,
  resetPassw,
  signInGoogle,
  sign_error,
};
