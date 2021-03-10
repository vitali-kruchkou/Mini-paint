import React, { useContext } from 'react';
import { UserContext } from '@providers/UserProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import Authentication from '@modules/Authentication/Authentication';
import HomePage from '@modules/Canvas/HomePage/HomePage';

const Routes = () => {
  const user = useContext(UserContext);

  return user ? (
    <Router>
      <HomePage />
    </Router>
  ) : (
    <Router>
      <Authentication />
    </Router>
  );
};

export default Routes;
