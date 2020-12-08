import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BookmarkProvider } from './Context/BookmarkContext';
import reducer, { initialState } from './Components/Reducer';
import { AuthProvider } from './Context/AuthContext';
import { SourceProvider } from './Context/SourceContext';

ReactDOM.render(
  <AuthProvider>
    <SourceProvider>
      <BookmarkProvider initialState={initialState} reducer={reducer}>
        <App />
      </BookmarkProvider>
    </SourceProvider>
  </AuthProvider>,
  document.getElementById('root')
);
