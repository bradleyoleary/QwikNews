import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleDetails from './Components/ArticleDetails';
import Bookmarks from './Components/Bookmarks';
import Header from './Components/Header';
import NewsCards from './Components/NewsCards';
import SwipeButtons from './Components/SwipeButtons';
import GlobalStyles from './Styles/GlobalStyles';

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route exact path='/'>
            <NewsCards />
            <SwipeButtons />
          </Route>
          <Route path='/bookmarks'>
            <Bookmarks />
          </Route>
          <Route path='/article-details'>
            <ArticleDetails />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
