import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { ArticleDetailsContext } from '../Context/ArticleDetailsContext';
import Loader from './Loader';
import { useAuth } from '../Context/AuthContext';
import { db } from './Firebase';
import { COLORS } from '../Styles/Constants';
import { ReactComponent as Logo } from '../Assets/illustration2.svg';

const Bookmarks = () => {
  const [myArticleBookmarks, setMyArticleBookmarks] = useState();
  const { setArticleUrl } = useContext(ArticleDetailsContext);
  const { currentUser } = useAuth();
  const [pageRender, setPageRender] = useState(false);

  //accessing the bookmarks from firebase
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

  //redirect to the article-details page
  let history = useHistory();
  const handleRedirect = (url) => {
    setArticleUrl(url);
    history.push(`/article-details`);
    // console.log('redirect');
  };

  //function to remove bookmarks
  const removeBookmark = async (bookmarkId) => {
    const bookmarksCollection = db.collection('bookmarks');
    const deleted = await bookmarksCollection.doc(bookmarkId).delete();
    setPageRender(!pageRender);
    console.log({ deleted });
  };

  //calls the bookmarks from the DB
  useEffect(() => {
    if (currentUser?.uid) {
      getBookmarks();
    }
  }, [currentUser?.uid, pageRender]);

  return (
    <CardContainer>
      <Header>
        {' '}
        <BookmarkIcon style={{ color: '#4a56e2' }} /> My Bookmarks
      </Header>
      <IllustrationWrapper>
        <StyledIllustration />
        <p>You currently have no bookmarks.</p>
      </IllustrationWrapper>
      {myArticleBookmarks ? (
        myArticleBookmarks.map((bookmark) => {
          // console.log(bookmark);
          return (
            <CardBox style={{ backgroundImage: `url(${bookmark.image})` }}>
              <RemoveButton
                onClick={() => {
                  removeBookmark(bookmark.id);
                }}>
                <CloseIcon style={{ fontSize: 24, color: 'white' }} />
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
        })
      ) : (
        <Loader />
      )}
    </CardContainer>
  );
};

const IllustrationWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: auto;
  z-index: -1100;
  position: absolute;
  top: 200px;
  padding-bottom: 0px;
  align-items: center;
  color: ${COLORS.secondaryFont};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
`;

const Header = styled.h1`
  margin-bottom: 26px;
  font-size: 1.2rem;
  color: ${COLORS.primaryFont};
`;

const RemoveButton = styled.button`
  float: right;
  padding: 10px;
  border: none;
  border-radius: 50px;
  background-color: #ff4757;
  margin: -35px -35px 0px 0px;
`;

const CardBox = styled.div`
  position: relative;
  width: 600px;
  padding: 20px;
  max-width: 85vw;
  height: 45vh;
  border-radius: 18px;
  background-size: cover;
  background-position: center;
  margin-bottom: 5vh;
  -webkit-box-shadow: 0px 10px 39px -8px rgba(0, 0, 0, 0.45);
  box-shadow: 0px 10px 39px -8px rgba(0, 0, 0, 0.45);
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
  border-radius: 0px 0px 12px 12px;
  justify-content: center;
  border: 3px solid #24cca7;
`;

const StyledIllustration = styled(Logo)`
  height: 240px;
  width: auto;
  justify-content: center;
  padding-bottom: 10px;
`;

export default Bookmarks;
