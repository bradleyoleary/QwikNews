import React from 'react';
import styled from 'styled-components';
import LanguageIcon from '@material-ui/icons/Language';
import UserProfile from './UserProfile';
import { useUserSettings } from './UserSettings';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';

const Header = () => {
  const { toggleDrawer } = useUserSettings();
  return (
    <Wrapper>
      <UserProfile />
      <Link to='/'>
        <LanguageIcon style={{ fontSize: 34, color: '#4a56e2' }} />
      </Link>
      <IconButton>
        <MoreVertIcon
          style={{ fontSize: 34 }}
          onClick={toggleDrawer('bottom', true)}></MoreVertIcon>
      </IconButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f9f9f9;
  padding: 20px;
`;

export default Header;
