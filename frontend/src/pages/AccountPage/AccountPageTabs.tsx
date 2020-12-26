import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import SettingsIcon from '@material-ui/icons/Settings';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';

import ReorderIcon from '@material-ui/icons/Reorder';
import { Box, Typography, AppBar, Tabs, Tab } from '@material-ui/core';
import { SettingsTab } from './components/SettingsTab';
import { MyRecipesTab } from './components/MyRecipesTab';
import { FavoriteRecipesTab } from './components/FavoriteRecipesTab';
import { CollectionsTab } from './components/CollectionsTab';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
    // backgroundColor: theme.palette.background.paper
  }
}));

export const AccountPageTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          scrollButtons='on'
          indicatorColor='primary'
          textColor='primary'
          aria-label='scrollable force tabs example'>
          <Tab label='My Recipes' icon={<ReorderIcon />} {...a11yProps(0)} />
          <Tab label='Collections' icon={<ListIcon />} {...a11yProps(1)} />
          <Tab label='Favorites' icon={<FavoriteIcon />} {...a11yProps(2)} />
          <Tab label='Settings' icon={<SettingsIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MyRecipesTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CollectionsTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FavoriteRecipesTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SettingsTab />
      </TabPanel>
    </div>
  );
};
