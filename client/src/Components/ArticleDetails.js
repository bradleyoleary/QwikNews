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
    history.goBack();
  };
  // console.log(articleUrl);
  return (
    <div>
      <Wrapper>
        <BackButton onClick={() => handleExitArticleDetails()}>
          <Arrow />
        </BackButton>
        <Word>Article Details</Word>
      </Wrapper>
      <Window url={articleUrl} display='initial' position='relative' />;
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 28px;
  justify-content: space-between;
  border-bottom: 2px solid #f2f2f2;
`;

const Word = styled.h1`
  font-size: 1.2rem;
`;

const BackButton = styled.button`
  display: flex;
  margin-top: 0px;
  background: ${COLORS.primary};
  color: white;
  border-radius: 50px;
  padding: 10px;
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
