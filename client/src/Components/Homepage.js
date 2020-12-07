import React from 'react';
import NewsCards from './NewsCards';
import Header from './Header';
import SwipeButtons from './SwipeButtons';

export default function Homepage() {
  return (
    <div>
      <Header />
      <NewsCards />
      <SwipeButtons />
    </div>
  );
}
