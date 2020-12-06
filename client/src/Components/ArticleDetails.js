import React from 'react';
import Iframe from 'react-iframe';

const ArticleDetails = () => {
  return (
    <Iframe
      url='https://newsapi.org/docs/endpoints/top-headlines'
      width='400px'
      height='700'
      id='myId'
      className='myClassname'
      display='initial'
      position='relative'
    />
  );
};

export default ArticleDetails;
