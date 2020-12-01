import React from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/Person';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';

const Header = () => {
  return (
    <Wrapper>
      <IconButton>
        <PersonIcon style={{ fontSize: 34 }} />
      </IconButton>
      <LanguageIcon style={{ fontSize: 34, color: '#4a56e2' }} />
      <IconButton>
        <MoreVertIcon style={{ fontSize: 34 }} />
      </IconButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;
  padding: 20px;
`;

export default Header;
