import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BookmarkProvider } from './Context/BookmarkContext';
import reducer, { initialState } from './Components/Reducer';

ReactDOM.render(
  <React.StrictMode>
    <BookmarkProvider initialState={initialState} reducer={reducer}>
      <App />
    </BookmarkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
