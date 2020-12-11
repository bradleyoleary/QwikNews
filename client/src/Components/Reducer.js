const initialState = {};

export const bookmarkReducer = (state = initialState, action) => {
  console.log(action);
  // console.log(state);
  switch (action.type) {
    case 'ADD_ARTICLE': {
      return {
        ...state,
        [action.article.url]: {
          ...action.article,
          quantity:
            state[action.article.url] && state[action.article.url].quantity
              ? state[action.article.url].quantity + 1
              : 1,
        },
      };
    }
    default:
      return state;
  }
};
