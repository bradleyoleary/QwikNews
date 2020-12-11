import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ArticleDetailsContext } from '../Context/ArticleDetailsContext';
import { useAuth } from '../Context/AuthContext';
import { db } from './Firebase';

const Bookmarks = () => {
  const [myArticleBookmarks, setMyArticleBookmarks] = useState([]);
  const { setArticleUrl } = useContext(ArticleDetailsContext);
  const { currentUser } = useAuth();
  const [pageRender, setPageRender] = useState(false);

  const getBookmarks = async () => {
    const bookmarksCollection = db.collection('bookmarks');
    const userRef = db.collection('users').doc(currentUser.uid);
    const bookmarksSnapshot = await bookmarksCollection
      .where('userRef', '==', userRef)
      .get();

    const myArticleBookmarksIds = bookmarksSnapshot.docs.map(
      (bookmark) => bookmark.id
    );

    const reads = myArticleBookmarksIds.map((id) =>
      bookmarksCollection.doc(id).get()
    );
    const result = await Promise.all(reads);
    console.log(result);
    const myArticleBookmarks = result.map((result) => ({
      ...result.data(),
      id: result.id,
    }));

    setMyArticleBookmarks(myArticleBookmarks);
  };

  let history = useHistory();
  const handleRedirect = (url) => {
    setArticleUrl(url);
    history.push(`/article-details`);
    // console.log('redirect');
  };

  const removeBookmark = async (bookmarkId) => {
    const bookmarksCollection = db.collection('bookmarks');
    const deleted = await bookmarksCollection.doc(bookmarkId).delete();
    setPageRender(!pageRender);
    console.log({ deleted });
  };

  useEffect(() => {
    if (currentUser?.uid) {
      getBookmarks();
    }
  }, [currentUser?.uid, pageRender]);

  return (
    <CardContainer>
      {myArticleBookmarks.map((bookmark) => {
        console.log(bookmark);
        return (
          <CardBox style={{ backgroundImage: `url(${bookmark.image})` }}>
            <RemoveButton
              onClick={() => {
                removeBookmark(bookmark.id);
              }}>
              X
            </RemoveButton>
            <BottomContainer
              onClick={() => {
                handleRedirect(bookmark.url);
              }}>
              <ArticleSource>{bookmark.source}</ArticleSource>
              <ArticleTitle>{bookmark.title}</ArticleTitle>
            </BottomContainer>
          </CardBox>
        );
      })}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
`;

const RemoveButton = styled.button`
  padding: 10px;
  color: red;
`;

const CardBox = styled.div`
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

const ArticleTitle = styled.p`
  display: flex;
  font-weight: 500;
  color: #303030;
`;

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

export default Bookmarks;
