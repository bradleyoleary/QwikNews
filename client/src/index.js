import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import { SourceProvider } from './Context/SourceContext';

ReactDOM.render(
  <AuthProvider>
    <SourceProvider>
      <App />
    </SourceProvider>
  </AuthProvider>,
  document.getElementById('root')
);
