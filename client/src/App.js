import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleDetails from './Components/ArticleDetails';
import Bookmarks from './Components/Bookmarks';
import Header from './Components/Header';
import Signup from './Components/Signup';
import GlobalStyles from './Styles/GlobalStyles';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import Homepage from './Components/Homepage';
import ForgotPassword from './Components/ForgotPassword';
import { ArticleDetailsProvider } from './Context/ArticleDetailsContext';
import UserSettingsProvider from './Components/UserSettings';
import OnboardingPage from './Components/OnboardingPage';

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <UserSettingsProvider>
          <Switch>
            <Route path='/sign-up'>
              <Container
                className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '80vh' }}>
                <div className='w-100' style={{ maxWidth: '500px' }}>
                  <Signup />
                </div>
              </Container>
            </Route>
            <Route path='/onboarding'>
              <OnboardingPage />
            </Route>
            <Route path='/login'>
              <Container
                className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '80vh' }}>
                <div className='w-100' style={{ maxWidth: '500px' }}>
                  <Login />
                </div>
              </Container>
            </Route>
            <Route path='/forgot-password'>
              <Container
                className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '80vh' }}>
                <div className='w-100' style={{ maxWidth: '500px' }}>
                  <ForgotPassword />
                </div>
              </Container>
            </Route>
            <ArticleDetailsProvider>
              <PrivateRoute exact path='/' component={Homepage}></PrivateRoute>
              <Route path='/bookmarks'>
                <Header />
                <Bookmarks />
              </Route>
              <Route path='/article-details'>
                <Header />
                <ArticleDetails />
              </Route>
            </ArticleDetailsProvider>
          </Switch>
        </UserSettingsProvider>
      </Router>
    </>
  );
};

export default App;
