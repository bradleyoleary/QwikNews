import React, { useState } from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import './TinderCard.css';

const NewsCards = () => {
  //testing to see card functionality with dummy data
  const [articles, setArticles] = useState([
    {
      name: 'article name',
      description: 'article description',
      url:
        'https://images.daznservices.com/di/library/sporting_news/b8/9d/stephen-curry-113020-getty-ftr_1jd9agby2e0yr1ac64d426pcv3.jpg?t=481389446&quality=60&w=1280&h=720',
    },
    {
      name: 'another article name',
      description: 'article description',
      url:
        'https://media1.s-nbcnews.com/j/newscms/2018_31/2517376/180802-sweden-mountain-mc-9352_c0684b6451e1a60de265cf86ed3987b0.nbcnews-fp-1200-630.JPG',
    },
  ]);

  return (
    <div>
      <CardContainer>
        {articles.map((article) => (
          <TinderCard
            className='swipe'
            key={article.name}
            preventSwipe={['up', 'down']}>
            <Card style={{ backgroundImage: `url(${article.url})` }}>
              <BottomContainer>
                <ArticleName>{article.name}</ArticleName>
                <ArticleDescription>{article.description}</ArticleDescription>
              </BottomContainer>
            </Card>
          </TinderCard>
        ))}
      </CardContainer>
    </div>
  );
};

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
`;

const Card = styled.div`
  position: relative;
  width: 600px;
  padding: 20px;
  max-width: 80vw;
  height: 55vh;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 10px;
  background-color: white;
  width: 600px;
  max-width: 85vw;
  height: 100px;
  border-radius: 10px;
  justify-content: center;
`;

export default NewsCards;
