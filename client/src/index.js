import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import { SourceProvider } from './Context/SourceContext';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { bookmarkReducer } from './Components/Reducer';

const store = createStore(
  bookmarkReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <AuthProvider>
    <SourceProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SourceProvider>
  </AuthProvider>,
  document.getElementById('root')
);
