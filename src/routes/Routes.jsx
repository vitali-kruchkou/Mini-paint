import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Authentication from '@modules/Authentication/Authentication';
import Canvas from '@modules/Canvas/Canvas';
import { BrowserRouter as Router } from 'react-router-dom';

const Routes = () => {
  const user = useSelector(state => state.currentAuth);
  return user.login ? (
    <Router>
      <Canvas />
    </Router>
  ) : (
    <Router>
      <Authentication />
    </Router>
  );
};

export default Routes;
