//setup data layer
//needed to setup bookmarks

import React, { createContext, useContext, useReducer } from 'react';

export const BookMarkContext = createContext();

export const BookmarkProvider = ({ reducer, initialState, children }) => (
  <BookMarkContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </BookMarkContext.Provider>
);

export const useStateValue = () => useContext(BookMarkContext);
