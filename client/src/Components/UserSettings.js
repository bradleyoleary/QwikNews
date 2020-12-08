import React, { useState, useContext } from 'react';
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
import { SourceContext } from '../Context/SourceContext';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const categoryFilter = {
  Business: 'business',
  Entertainment: 'entertainment',
  General: ' general',
  Health: 'health',
  Science: 'science',
  Sports: 'sports',
  Technology: 'technology',
};

const UserSettings = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  // const [newsSources, setNewsSources] = useState([]);
  const [sources, setSources] = useState('allSources');
  const [categories, setCategories] = useState('allCategories');
  const [sourceInfo, setSourceInfo] = useState({});
  const [categoryInfo, setCategoryInfo] = useState({});
  const { sourceData } = useContext(SourceContext);

  //material-ui drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //api call for when a user selects a specific source
  const onSourceChange = async (ev) => {
    const siteUrl = 'https://newsapi.org/v2';
    const sourceVal = ev.target.value;
    setSources(sourceVal);
    // console.log('This thing working?', sourceVal);
    const url =
      sourceVal === 'allSources'
        ? `${siteUrl}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        : `${siteUrl}/top-headlines?sources=${sourceVal}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSources(sourceVal);
        setSourceInfo(data);
      });
  };

  console.log('HERE IS THE SOURCE INFO', sourceInfo);

  //api call for when a user selects a specific category
  const onCategoryChange = async (ev) => {
    const siteUrl = 'https://newsapi.org/v2';
    const categoryVal = ev.target.value;
    setCategories(categoryVal);
    // console.log('This thing working?', categoryVal);
    const url =
      categoryVal === 'allCategories'
        ? `${siteUrl}/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        : `${siteUrl}/top-headlines?category=${categoryVal}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(categoryVal);
        setCategoryInfo(data);
      });
  };

  console.log('HERE IS THE CATEGORY INFO', categoryInfo);

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
            <MenuItem value='allSources'>All Sources</MenuItem>
            {sourceData
              ? sourceData.sources.map((sources) => {
                  return (
                    <MenuItem value={sources.name}>{sources.name}</MenuItem>
                  );
                })
              : 'loading'}
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
            {Object.keys(categoryFilter).map((key) => {
              return <MenuItem value={key}>{key}</MenuItem>;
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
};

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

export default UserSettings;
