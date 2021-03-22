import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Authentication from '../modules/Authentication/Authentication';
import Canvas from '../modules/Canvas/Canvas';
import { UserContext } from '../providers/UserProvider';

const Routes = () => {
  const user = useContext(UserContext);

  return user ? (
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
