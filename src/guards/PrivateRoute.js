import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector(state => state.currentAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.login ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
