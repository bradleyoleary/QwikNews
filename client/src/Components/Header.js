import React from 'react';
import styled from 'styled-components';
import LanguageIcon from '@material-ui/icons/Language';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';

const Header = () => {
  return (
    <Wrapper>
      <UserProfile />
      <LanguageIcon style={{ fontSize: 34, color: '#4a56e2' }} />
      <UserSettings />
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
