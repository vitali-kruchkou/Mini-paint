import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '@modules/Authentication/Authentication';
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from '@guards/PrivateRoute';
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
      console.log(user);
      dispatch(allActions.authActions.signIn(user));
      //dispatch action login
    });
  }, []);
  console.log(user);
  return user.login ? (
    // <Router>
    //   <Canvas />
    // </Router>
    <Router>
      <Toaster />
      <PrivateRoute path="/" auth={user.login}>
        <Paint />
      </PrivateRoute>
    </Router>
  ) : (
    <Router>
      <Authentication />
    </Router>
  );
};

export default Routes;
