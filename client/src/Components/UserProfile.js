import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../Styles/Constants';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  List,
  Divider,
  IconButton,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';

const useStyles = makeStyles({
  list: {
    height: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function UserProfile() {
  const classes = useStyles();
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out.');
    }
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <Profile>My Profile: {currentUser.email}</Profile>
        {error && <Alert variant='danger'>{error}</Alert>}
      </List>
      <Divider />
      <Wrap>
        <LinkToPages to='/'>
          <NewsFeed>News Feed</NewsFeed>
        </LinkToPages>
        <LinkToPages to='/bookmarks'>
          <Bookmarks>My Bookmarks</Bookmarks>
        </LinkToPages>
        <Button onClick={handleLogout}>Sign Out</Button>
      </Wrap>
    </div>
  );

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton>
            <PersonIcon
              style={{ fontSize: 34 }}
              onClick={toggleDrawer(anchor, true)}>
              {anchor}
            </PersonIcon>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const LinkToPages = styled(Link)`
  color: #303030;
  text-decoration: none;

  &:hover {
    color: ${COLORS.primary};
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

const Profile = styled.h1`
  padding: 10px;
`;

const NewsFeed = styled.p`
  padding: 10px;
`;

const Bookmarks = styled.p`
  padding: 10px;
`;

const Button = styled.button`
  justify-content: center;
  display: flex;
  margin-top: 20px;
  background: #ff4757;
  color: white;
  border-radius: 5px;
  padding: 15px;
  margin: 30px 50px;
  border: 0px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
