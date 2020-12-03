import React from 'react';
import styled from 'styled-components';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import './SwipeButtons.css';

const SwipeButtons = () => {
  return (
    <div className='swipeButtons'>
      <IconButton>
        <ReplayIcon
          className='swipeButtons__replay'
          style={{ fontSize: 34, color: '#4a56e2' }}
        />
      </IconButton>
      <IconButton>
        <CloseIcon
          className='swipeButtons__replay'
          style={{ fontSize: 34, color: '#ff4757' }}
        />
      </IconButton>
      <IconButton>
        <BookmarkIcon
          className='swipeButtons__replay'
          style={{ fontSize: 34, color: '#24cca7' }}
        />
      </IconButton>
    </div>
  );
};

// const div = styled.div`
//   position: fixed;
//   display: flex;
//   justify-content: space-evenly;
//   width: 100%;
//   bottom: 10vh;
// `;

// const ReplayButton = styled(ReplayIcon)`
//   background-color: white;
//   box-shadow: 0px 0px 23px 6px rgba(0, 0, 0, 0.26) !important;
//   border-radius: 50px;
// `;

export default SwipeButtons;
