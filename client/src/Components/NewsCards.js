import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import Axios from 'axios';

const NewsCards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await Axios.get(
          `https://newsapi.org/v2/everything?q=sports&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        setArticles(response.data.articles);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getArticles();
  }, []);

  return (
    <div>
      <CardContainer>
        {articles.map((article) => (
          <NewsCard key={article.title} preventSwipe={['up', 'down']}>
            <Card style={{ backgroundImage: `url(${article.urlToImage})` }}>
              <BottomContainer>
                <ArticleName>{article.title}</ArticleName>
                <ArticleDescription>{article.description}</ArticleDescription>
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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const ArticleName = styled.h1`
  display: flex;
`;

const ArticleDescription = styled.p`
  display: flex;
  padding-top: 6px;
`;

const BottomContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 10px;
  background-color: white;
  width: 600px;
  max-width: 85vw;
  height: 160px;
  border-radius: 10px;
  justify-content: center;
`;

export default NewsCards;
