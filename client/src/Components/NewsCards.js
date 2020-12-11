import React, { useContext, useEffect, useState, useMemo } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';
import { ArticleDetailsContext } from '../Context/ArticleDetailsContext';
import { useUserSettings } from './UserSettings';
import CloseIcon from '@material-ui/icons/Close';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import './SwipeButtons.css';
import { useDispatch } from 'react-redux';
import { addArticle } from './Actions';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { COLORS } from '../Styles/Constants';
import { useAuth } from '../Context/AuthContext';
import { db } from './Firebase';

const NewsCards = () => {
  const { setArticleUrl } = useContext(ArticleDetailsContext);
  const { currentSource, currentCategory, searchTerm } = useUserSettings();
  const [data, setData] = useState();
  const alreadyRemoved = [];
  const childRefs = useMemo(
    () =>
      Array(data?.articles.length)
        .fill(0)
        .map((i) => React.createRef()),
    [data]
  );
  const dispatch = useDispatch();
  const url = 'https://newsapi.org/v2';
  const { currentUser } = useAuth();

  // console.log(childRefs);

  //api call for user search
  useEffect(() => {
    Axios.get(
      `${url}/everything?q=${searchTerm}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [searchTerm]);

  //api call for specific source
  useEffect(() => {
    // console.log(currentSource);
    const websiteUrl =
      currentSource === 'allSources'
        ? `${url}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        : `${url}/everything?sources=${currentSource}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
    Axios.get(websiteUrl)
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [currentSource]);

  //api call for specific category
  useEffect(() => {
    // console.log(currentCategory);
    const websiteUrl =
      currentCategory === 'allCategories'
        ? `${url}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        : `${url}/top-headlines?country=us&category=${currentCategory}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
    Axios.get(websiteUrl)
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [currentCategory]);

  //directs user to the article details page when they click a card
  let history = useHistory();
  const handleRedirect = (url) => {
    setArticleUrl(url);
    history.push(`/article-details`);
    // console.log('redirect');
  };

  //allows user to use the x and bookmark buttons
  const swipe = (dir) => {
    const cardsLeft = data.articles.filter(
      (article) => !alreadyRemoved.includes(article.url)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].url;
      // console.log(toBeRemoved);
      const index = data.articles
        .map((article) => article.url)
        .indexOf(toBeRemoved);
      console.log(index);
      alreadyRemoved.push(toBeRemoved);
      childRefs[index].current.swipe(dir);
    }
  };

  //working on getting redux working to add bookmarks****
  const addToBookmarks = async () => {
    const cardsLeft = data.articles.filter(
      (article) => !alreadyRemoved.includes(article.url)
    );
    const currentArticle = cardsLeft[cardsLeft.length - 1];
    const bookmarksCollection = db.collection('bookmarks');
    const userRef = db.collection('users').doc(currentUser.uid);
    const bookmarkedArticles = await bookmarksCollection.add({
      userRef: userRef,
      url: currentArticle.url,
    });
    console.log(bookmarkedArticles);

    // const cardsLeft = data.articles.filter(
    //   (article) => !alreadyRemoved.includes(article.url)
    // );
    // const toBeRemoved = cardsLeft[cardsLeft.length - 1].url;
    swipe('right');
    dispatch(addArticle(currentArticle));
  };

  //success notification when user selects the share button
  const shareButtonConfirmation = (type) => {
    notification[type]({
      message: 'The article URL has been copied to your clipboard.',
    });
  };

  //functionality for the share button on the homepage
  const ShareArticleUrl = async () => {
    shareButtonConfirmation('success');
    const cardsLeft = data.articles.filter(
      (article) => !alreadyRemoved.includes(article.url)
    );
    const toBeRemoved = cardsLeft[cardsLeft.length - 1].url;
    try {
      await navigator.clipboard.writeText(toBeRemoved);
      console.log('Article URL copied to clipboard');
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };
  //mapping through the articles to return info on the cards.
  return (
    <div>
      <CardContainer>
        {data ? (
          data.articles.map((article, index) => (
            <NewsCard
              ref={childRefs[index]}
              key={article.title}
              preventSwipe={['up', 'down']}>
              <Card style={{ backgroundImage: `url(${article.urlToImage})` }}>
                <BottomContainer
                  onClick={() => {
                    handleRedirect(article.url);
                  }}>
                  <ArticleSource>{article.source.name}</ArticleSource>
                  <ArticleName>{article.title}</ArticleName>
                </BottomContainer>
              </Card>
            </NewsCard>
          ))
        ) : (
          <Loader />
        )}
        <div className='swipeButtons'>
          <IconButton>
            <CloseIcon
              onClick={() => swipe('left')}
              className='swipeButtons__close'
              style={{ fontSize: 34, color: '#ff4757' }}
            />
          </IconButton>
          <IconButton>
            <ShareIcon
              onClick={ShareArticleUrl}
              className='swipeButtons__share'
              style={{ fontSize: 34, color: `${COLORS.secondary}` }}
            />
          </IconButton>
          <IconButton>
            <BookmarkIcon
              onClick={addToBookmarks}
              className='swipeButtons__bookmark'
              style={{ fontSize: 34, color: '#4a56e2' }}
            />
          </IconButton>
        </div>
      </CardContainer>
    </div>
  );
};

const NewsCard = styled(TinderCard)`
  position: absolute;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
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
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.23); //Need to fix shadow */
`;

const ArticleSource = styled.span`
  font-weight: 500;
  color: #757575;
  margin-bottom: 10px;
`;

const ArticleName = styled.p`
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
  border: 3px solid ${COLORS.secondary}; //Temp fix to the shadow issue
  transition: 0.2s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 0px 76px -11px rgba(36, 204, 167, 0.51);
    cursor: pointer;
  }
`;

export default NewsCards;
