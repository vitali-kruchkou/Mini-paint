import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@modules/Authentication/Authentication';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Paint from '@modules/Paint/Paint';
import { auth } from '@firebaseConfig/';
import { generateUserDocument } from '@firebaseConfig/';
import allActions from '@store/actions';

const Routes = () => {
  const user = useSelector(state => state.currentAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      if (user) {
        dispatch(allActions.authActions.signIn(user));
      }
    });
  }, []);

  return user.login ? (
    <>
      <Toaster />
      <Router>
        <Paint />
      </Router>
    </>
  ) : (
    <Router>
      <Authentication />
    </Router>
  );
};

export default Routes;
