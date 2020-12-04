import Axios from 'axios';

const url = 'https://newsapi.org/v2';

//api call for top headlines
export const fetchNews = async () => {
  try {
    const {
      data: { articles },
    } = await Axios.get(
      `${url}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    //console.log(articles);

    return articles.map((article) => article);
  } catch (error) {
    console.log(error);
  }
};

//api call for all news sources
export const fetchNewsSources = async () => {
  try {
    const {
      data: { sources },
    } = await Axios.get(
      `${url}/sources?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    console.log(sources);

    return sources.map((source) => source);
  } catch (error) {
    console.log(error);
  }
};
