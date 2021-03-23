import React from 'react';
import { useSelector } from 'react-redux';
import Authentication from '@modules/Authentication/Authentication';
import Canvas from '@modules/Paint/Canvas/Canvas';
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from '@guards/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import Paint from '@modules/Paint/Paint';

const Routes = () => {
  const user = useSelector(state => state.currentAuth);
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
