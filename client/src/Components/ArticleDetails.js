import React, { useContext } from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';
import { ArticleDetailsContext } from '../Context/ArticleDetailsContext';
import { useParams } from 'react-router-dom';

const ArticleDetails = () => {
  const { articleUrl } = useContext(ArticleDetailsContext);
  console.log(articleUrl);
  return <Window url={articleUrl} display='initial' position='relative' />;
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
