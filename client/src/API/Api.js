import Axios from 'axios';

const url = 'https://newsapi.org/v2';

export const fetchNews = async () => {
  try {
    const {
      data: { articles },
    } = await Axios.get(
      `${url}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    console.log(articles);

    return articles.map((article) => article);
  } catch (error) {
    console.log(error);
  }
};
