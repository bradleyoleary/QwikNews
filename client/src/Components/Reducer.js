export const initialState = {
  bookmarks: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'ADD_TO_BOOKMARKS':
      //Logic for adding article to bookmarks
      return { ...state, bookmarks: [...state.bookmarks, action.item] };
    case 'REMOVE_FROM_BOOKMARKS':
    //Logic for removing bookmark
    default:
      return state;
  }
};

export default reducer;
