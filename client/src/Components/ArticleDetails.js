import React from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';

const ArticleDetails = () => {
  return (
    <Window
      url='https://newsapi.org/docs/endpoints/top-headlines'
      display='initial'
      position='relative'
    />
  );
};

const Window = styled(Iframe)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  border: none;
`;

export default ArticleDetails;
