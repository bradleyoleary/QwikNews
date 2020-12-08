import Axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const NewsApiContext = createContext();

export const NewsApiProvider = (props) => {
  console.log(props);
  const [data, setData] = useState();
  const url = 'https://newsapi.org/v2';

  useEffect(() => {
    Axios.get(
      `${url}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    )
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(data);

  return (
    <NewsApiContext.Provider value={{ data }}>
      {props.children}
    </NewsApiContext.Provider>
  );
};
