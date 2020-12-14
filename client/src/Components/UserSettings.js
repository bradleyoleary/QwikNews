import React, { useState, useContext, createContext } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  List,
  Divider,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import { COLORS } from '../Styles/Constants';
import { SourceContext } from '../Context/SourceContext';
import FilterListIcon from '@material-ui/icons/FilterList';
import { DebounceInput } from 'react-debounce-input';

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

const UserSettingsContext = createContext({
  currentSource: 'allSources',
  currentCategory: 'allCategories',
});

const UserSettingsProvider = ({ children }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });
  const [currentSource, setCurrentSource] = useState('allSources');
  const [currentCategory, setCurrentCategory] = useState('allCategories');
  const [searchTerm, setSearchTerm] = useState('');
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

  const onSearchChange = async (ev) => {
    setSearchTerm(ev.target.value);
  };

  //event trigger for when a user selects a source from the dropdown
  const onSourceChange = async (ev) => {
    setCurrentSource(ev.target.value);
  };

  //event trigger for when a user selects a category from the dropdown
  const onCategoryChange = async (ev) => {
    const categoryVal = ev.target.value;
    setCurrentCategory(categoryVal);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'>
      <List>
        <Settings>
          <FilterListIcon
            style={{ color: '#4a56e2', marginRight: '5px', fontSize: 32 }}
          />{' '}
          My Filters
        </Settings>
      </List>
      <Divider />
      <Wrap>
        <SelectSource>Search News</SelectSource>
        <TextInput
          placeholder='Search...'
          minLength={2}
          debounceTimeout={2000}
          onChange={onSearchChange}
        />
        <SelectSource>Browse by Source</SelectSource>
        <FormControl>
          <SelectDropdown
            variant='outlined'
            value={currentSource}
            onChange={onSourceChange}>
            {/* looping through all sources to show in the dropdown */}
            <MenuItem value='allSources'>All Sources</MenuItem>
            {sourceData
              ? sourceData.sources.map((sources) => {
                  return <MenuItem value={sources.id}>{sources.id}</MenuItem>;
                })
              : 'loading'}
          </SelectDropdown>
        </FormControl>

        <SelectSource>Browse by Category</SelectSource>
        <FormControl>
          <SelectDropdown
            variant='outlined'
            value={currentCategory}
            onChange={onCategoryChange}>
            {/* looping through all categories to show in the dropdown. */}
            <MenuItem value='allCategories'>All Categories</MenuItem>
            {Object.keys(categoryFilter).map((key) => {
              return <MenuItem value={key}>{key}</MenuItem>;
            })}
          </SelectDropdown>
        </FormControl>
        <ButtonWrap onClick={toggleDrawer(anchor, false)}>
          <Button>View Results</Button>
        </ButtonWrap>
      </Wrap>
    </div>
  );

  //using context to pass props to the NewsCards component
  return (
    <UserSettingsContext.Provider
      value={{ currentSource, currentCategory, searchTerm, toggleDrawer }}>
      <>
        {children}
        <div>
          <React.Fragment>
            <Drawer
              anchor={'bottom'}
              open={state['bottom']}
              onClose={toggleDrawer('bottom', false)}>
              {list('bottom')}
            </Drawer>
          </React.Fragment>
        </div>
      </>
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => {
  return useContext(UserSettingsContext);
};

const TextInput = styled(DebounceInput)`
  padding: 16px;
  border-radius: 4px;
  margin: 10px 10px;
  border: 1px solid #c4c4c4;
`;

const SelectDropdown = styled(Select)`
  margin: 10px 10px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Settings = styled.h1`
  padding: 5px;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectSource = styled.h2`
  padding: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

const Button = styled.button`
  justify-content: center;
  display: flex;
  margin-top: 20px;
  background: ${COLORS.secondary};
  color: white;
  border-radius: 5px;
  padding: 15px;
  margin: 30px 50px;
  border: 0px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default UserSettingsProvider;
