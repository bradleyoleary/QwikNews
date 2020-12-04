import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import './SwipeButtons.css';

const SwipeButtons = () => {
  return (
    <div className='swipeButtons'>
      <IconButton>
        <CloseIcon
          className='swipeButtons__close'
          style={{ fontSize: 34, color: '#ff4757' }}
        />
      </IconButton>
      <IconButton>
        <BookmarkIcon
          className='swipeButtons__bookmark'
          style={{ fontSize: 34, color: '#4a56e2' }}
        />
      </IconButton>
      <IconButton>
        <ShareIcon
          className='swipeButtons__share'
          style={{ fontSize: 34, color: '#24cca7' }}
        />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
