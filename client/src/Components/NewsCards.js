import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import { fetchNews } from '../API/Api';

const NewsCards = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setNewsArticles(await fetchNews());
    };
    fetchAPI();
  }, []);

  // console.log(newsArticles);

  return (
    <div>
      <CardContainer>
        {newsArticles.map((article) => (
          <NewsCard key={article.title} preventSwipe={['up', 'down']}>
            <Card style={{ backgroundImage: `url(${article.urlToImage})` }}>
              <BottomContainer>
                <ArticleSource>{article.source.name}</ArticleSource>
                <ArticleName>{article.title}</ArticleName>
                {/* <ArticleDescription>{article.description}</ArticleDescription> */}
              </BottomContainer>
            </Card>
          </NewsCard>
        ))}
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
  border-radius: 16px;
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

// const ArticleDescription = styled.p`
//   display: flex;
//   padding-top: 6px;
// `;

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
`;

export default NewsCards;
