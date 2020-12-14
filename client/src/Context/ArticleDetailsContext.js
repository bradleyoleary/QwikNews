import Axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ArticleDetailsContext = createContext();

export const ArticleDetailsProvider = (props) => {
  const [currentArticle, setCurrentArticle] = useState(0);
  const [articleUrl, setArticleUrl] = useState('');
  const url = 'https://newsapi.org/v2';

  useEffect(() => {
    Axios.get(
      `${url}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    )
      .then((res) => setArticleUrl(res.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(articleUrl);

  return (
    <ArticleDetailsContext.Provider
      value={{ articleUrl, setArticleUrl, currentArticle, setCurrentArticle }}>
      {props.children}
    </ArticleDetailsContext.Provider>
  );
};
