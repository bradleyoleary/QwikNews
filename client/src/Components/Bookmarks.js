import React, { useState } from 'react';
import styled from 'styled-components';

const NewsCards = () => {
  //testing to see card functionality with dummy data
  const [articles, setArticles] = useState([
    {
      source: 'article source',
      title: 'article title',
      url:
        'https://images.daznservices.com/di/library/sporting_news/b8/9d/stephen-curry-113020-getty-ftr_1jd9agby2e0yr1ac64d426pcv3.jpg?t=481389446&quality=60&w=1280&h=720',
    },
    {
      source: 'another article source',
      title: 'article title',
      url:
        'https://media1.s-nbcnews.com/j/newscms/2018_31/2517376/180802-sweden-mountain-mc-9352_c0684b6451e1a60de265cf86ed3987b0.nbcnews-fp-1200-630.JPG',
    },
  ]);

  return (
    <div>
      <CardContainer>
        {articles.map((article) => (
          <Card style={{ backgroundImage: `url(${article.url})` }}>
            <BottomContainer>
              <ArticleName>{article.source}</ArticleName>
              <ArticleSource>{article.title}</ArticleSource>
            </BottomContainer>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 5vh;
`;

const ArticleSource = styled.span`
  font-weight: 500;
  color: #757575;
  margin-bottom: 10px;
`;

const ArticleName = styled.h1`
  display: flex;
  font-weight: 500;
  color: #303030;
`;

// const ArticleSource = styled.p`
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
  border: 3px solid #24cca7;
`;

export default NewsCards;
