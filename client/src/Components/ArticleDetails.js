import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import Iframe from 'react-iframe';
import { ArticleDetailsContext } from '../Context/ArticleDetailsContext';
import { COLORS } from '../Styles/Constants';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ArticleDetails = () => {
  const { articleUrl } = useContext(ArticleDetailsContext);
  const history = useHistory();
  const handleExitArticleDetails = () => {
    history.push('/');
  };
  // console.log(articleUrl);
  return (
    <div>
      <ButtonDiv>
        <BackToArticles onClick={() => handleExitArticleDetails()}>
          <Arrow />
          Back to Articles
        </BackToArticles>
      </ButtonDiv>
      <Window url={articleUrl} display='initial' position='relative' />;
    </div>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #f9f9f9;
`;

const BackToArticles = styled.button`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 20px;
  background: ${COLORS.primary};
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 15px 80px;
  border: 0px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Arrow = styled(ArrowBackIcon)`
  align-items: center;
  justify-content: center;
`;

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
