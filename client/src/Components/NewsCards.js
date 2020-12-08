import React, { useContext } from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import { useHistory } from 'react-router-dom';
import { NewsApiContext } from '../Context/NewsApiContext';
import Loader from './Loader';
import { ArticleDetailsContext } from '../Context/ArticleDetailsContext';

const NewsCards = () => {
  const { data } = useContext(NewsApiContext);
  const { setArticleUrl } = useContext(ArticleDetailsContext);
  let history = useHistory();

  const handleRedirect = (url) => {
    setArticleUrl(url);
    history.push(`/article-details`);
    // console.log('redirect');
  };

  return (
    <div>
      <CardContainer>
        {data ? (
          data.articles.map((article) => (
            <NewsCard key={article.title} preventSwipe={['up', 'down']}>
              <Card style={{ backgroundImage: `url(${article.urlToImage})` }}>
                <BottomContainer
                  onClick={() => {
                    handleRedirect(article.url);
                  }}>
                  <ArticleSource>{article.source.name}</ArticleSource>
                  <ArticleName>{article.title}</ArticleName>
                </BottomContainer>
              </Card>
            </NewsCard>
          ))
        ) : (
          <Loader />
        )}
      </CardContainer>
    </div>
  );
};

const NewsCard = styled(TinderCard)`
  position: absolute;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
`;

const Card = styled.div`
  position: relative;
  width: 600px;
  padding: 20px;
  max-width: 85vw;
  height: 60vh;
  border-radius: 18px;
  background-size: cover;
  background-position: center;
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.23); //Need to fix shadow */
`;

const ArticleSource = styled.span`
  font-weight: 500;
  color: #757575;
  margin-bottom: 10px;
`;

const ArticleName = styled.p`
  display: flex;
  font-weight: 500;
  color: #303030;
`;

const BottomContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 0px 8px;
  background-color: white;
  width: 600px;
  max-width: 85vw;
  height: 115px;
  border-radius: 12px;
  justify-content: center;
  border: 3px solid #24cca7; //Temp fix to the shadow issue
  transition: 0.2s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 0px 76px -11px rgba(36, 204, 167, 0.51);
    cursor: pointer;
  }
`;

export default NewsCards;
