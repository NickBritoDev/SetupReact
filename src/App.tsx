import React from 'react';
import { KeyProvider } from './context/auth/token-login/authContext'; // Importe o KeyProvider
import Routes from './routes';

const App: React.FC = () => {
  return (
    <KeyProvider>
      <Routes />
    </KeyProvider>
  );
};

export default App;
