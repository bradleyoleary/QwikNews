import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  List,
  Divider,
  IconButton,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { COLORS } from '../Styles/Constants';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function UserSettings() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <Settings>My Settings</Settings>
      </List>
      <Divider />
      <Wrap>
        <SelectSource>Select Source</SelectSource>
        <FormControl className='app__dropdown'>
          <SelectDropdown variant='outlined' value='nothing'>
            <MenuItem value='source'>Source</MenuItem>
            <MenuItem value='source'>Source</MenuItem>
            <MenuItem value='source'>Source</MenuItem>
            <MenuItem value='source'>Source</MenuItem>
          </SelectDropdown>
        </FormControl>
        <FormControl>
          <SelectCategory>Select Category</SelectCategory>
          <SelectDropdown variant='outlined' value='nothing'>
            <MenuItem value='source'>Source</MenuItem>
            <MenuItem value='source'>Source</MenuItem>
            <MenuItem value='source'>Source</MenuItem>
            <MenuItem value='source'>Source</MenuItem>
          </SelectDropdown>
        </FormControl>
        <div onClick={toggleDrawer(anchor, false)}>
          <Button>Apply Settings</Button>
        </div>
      </Wrap>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton>
            <MoreVertIcon
              style={{ fontSize: 34 }}
              onClick={toggleDrawer(anchor, true)}>
              {anchor}
            </MoreVertIcon>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

// const Select = styled.select``;

const SelectDropdown = styled(Select)`
  margin: 10px 10px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Settings = styled.h1`
  padding: 10px;
`;

const SelectSource = styled.h2`
  padding: 10px;
`;

const SelectCategory = styled.h2`
  padding: 10px;
`;

const Button = styled.button`
  justify-content: center;
  align-content: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
  background: ${COLORS.secondary};
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 30px 40px;
  border: 0px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
