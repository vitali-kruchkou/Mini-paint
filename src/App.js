import React from 'react';
import './App.css';
import UserProvider from '@providers/UserProvider';
import Routes from '@routes/Routes';
function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
