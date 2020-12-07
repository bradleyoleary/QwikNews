import React, { useState, useEffect } from 'react';
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
import { fetchNewsSources } from '../API/Api';

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
  const [newsSources, setNewsSources] = useState([]);
  const [sources, setSources] = useState('allArticles');
  const [categories, setCategories] = useState('allCategories');

  //fetching sources
  useEffect(() => {
    const fetchAPI = async () => {
      setNewsSources(await fetchNewsSources());
    };
    fetchAPI();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onSourceChange = async (ev) => {
    const sourceVal = ev.target.value;
    // console.log('This thing working?', sourceVal);
    setSources(sourceVal);
  };

  const onCategoryChange = async (ev) => {
    const categoryVal = ev.target.value;
    // console.log('This thing working?', categoryVal);
    setCategories(categoryVal);
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
        {/* need to place an onChange in here to be fired when a menu item is selected */}
        <FormControl>
          <SelectDropdown
            variant='outlined'
            value={sources}
            onChange={onSourceChange}>
            {/* looping through all sources to show in the dropdown */}
            <MenuItem value='allArticles'>All Articles</MenuItem>
            {newsSources.map((sources) => {
              return <MenuItem value={sources.name}>{sources.name}</MenuItem>;
            })}
          </SelectDropdown>
        </FormControl>

        <SelectSource>Select Category</SelectSource>
        {/* need to place an onChange in here to be fired when a menu item is selected */}
        <FormControl>
          <SelectDropdown
            variant='outlined'
            value={categories}
            onChange={onCategoryChange}>
            {/* looping through all sources categories to show in the dropdown. This needs to be fixed to show each cat, not each cat for every article. */}
            <MenuItem value='allCategories'>All Categories</MenuItem>
            {newsSources.map((source) => {
              return (
                <MenuItem value={source.category}>{source.category}</MenuItem>
              );
            })}
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

// const SelectCategory = styled.h2`
//   padding: 10px;
// `;

const Button = styled.button`
  display: flex;
  margin-top: 20px;
  background: ${COLORS.secondary};
  color: white;
  border-radius: 5px;
  padding: 15px;
  margin: 30px 40px;
  border: 0px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
