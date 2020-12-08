import React, { createContext, useState } from 'react';

export const SourceSelectContext = createContext();

export const OnSourceChange = async (props, ev) => {
  const [sources, setSources] = useState('allSources');
  const [sourceInfo, setSourceInfo] = useState({});
  const siteUrl = 'https://newsapi.org/v2';
  const sourceVal = ev.target.value;
  setSources(sourceVal);
  // console.log('This thing working?', sourceVal);
  const url =
    sourceVal === 'allSources'
      ? `${siteUrl}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      : `${siteUrl}/top-headlines?sources=${sourceVal}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      setSources(sourceVal);
      setSourceInfo(data);
    });
  console.log('HERE IS THE SOURCE INFO', sourceInfo);

  return (
    <SourceSelectContext.Provider value={{ sourceInfo }}>
      {props.children}
    </SourceSelectContext.Provider>
  );
};
