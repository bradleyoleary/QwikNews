import Axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const SourceContext = createContext();

export const SourceProvider = (props) => {
  const [sourceData, setSourceData] = useState();
  const url = 'https://newsapi.org/v2';

  useEffect(() => {
    Axios.get(`${url}/sources?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
      .then((res) => setSourceData(res.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(sourceData);

  return (
    <SourceContext.Provider value={{ sourceData }}>
      {props.children}
    </SourceContext.Provider>
  );
};
