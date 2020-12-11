import React from 'react';
import styled from 'styled-components';
import LanguageIcon from '@material-ui/icons/Language';
import UserProfile from './UserProfile';
import { useUserSettings } from './UserSettings';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import { COLORS } from '../Styles/Constants';

const Header = () => {
  const { toggleDrawer } = useUserSettings();
  return (
    <Wrapper>
      <UserProfile />
      <StyledLink to='/'>
        <LanguageIcon style={{ fontSize: 34, color: '#4a56e2' }} />
        Qwik<NewsWrap>News</NewsWrap>
      </StyledLink>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.primaryFont};
  font-size: 1.3rem;
  font-weight: 500;

  &:hover {
    color: ${COLORS.primaryFont};
  }
`;

const NewsWrap = styled.span`
  color: ${COLORS.primary};
`;

export default Header;
