import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Bookmarks from './Components/Bookmarks';
import Home from './Components/Home';
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/bookmarks'>
            <Bookmarks />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
