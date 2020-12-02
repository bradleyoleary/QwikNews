import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Bookmarks from './Components/Bookmarks';
import Header from './Components/Header';
import NewsCards from './Components/NewsCards';
import GlobalStyles from './Styles/GlobalStyles';

function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route exact path='/'>
            <Header />
            <NewsCards />
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
