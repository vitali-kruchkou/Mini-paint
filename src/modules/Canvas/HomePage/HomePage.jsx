/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Style from './StyledHomePage';
import { SignOut } from '@firebaseConfig';

const HomePage = () => {
  const signOut = () => {
    SignOut();
  };

  return (
    <>
      <Style.Container>
        <Style.SignOut>
          <button onClick={signOut}>Sign out</button>
        </Style.SignOut>
        <h1>Home</h1>
      </Style.Container>
    </>
  );
};

export default HomePage;
