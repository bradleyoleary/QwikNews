// import React from 'react';
// import CloseIcon from '@material-ui/icons/Close';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
// import IconButton from '@material-ui/core/IconButton';
// import ShareIcon from '@material-ui/icons/Share';
// import { useStateValue } from '../Context/BookmarkContext';
// import './SwipeButtons.css';

// const SwipeButtons = () => {
//   const [{}, dispatch] = useStateValue();
//   const addToBookmarks = () => {
//     dispatch({
//       type: 'ADD_TO_BOOKMARKS',
//       item: {},
//     });
//   };
//   return (
//     <div className='swipeButtons'>
//       <IconButton>
//         <CloseIcon
//           className='swipeButtons__close'
//           style={{ fontSize: 34, color: '#ff4757' }}
//         />
//       </IconButton>
//       <IconButton>
//         <ShareIcon
//           className='swipeButtons__share'
//           style={{ fontSize: 34, color: '#24cca7' }}
//         />
//       </IconButton>
//       <IconButton>
//         <BookmarkIcon
//           onClick={addToBookmarks}
//           className='swipeButtons__bookmark'
//           style={{ fontSize: 34, color: '#4a56e2' }}
//         />
//       </IconButton>
//     </div>
//   );
// };

// export default SwipeButtons;
