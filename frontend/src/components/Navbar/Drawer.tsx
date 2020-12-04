import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  list: {
    width: 300
  },
  fullList: {
    width: 'auto'
  }
});

export const LoggedInDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const list = () => (
    <div className={clsx(classes.list)} role='presentation'>
      <List>
        <Link style={{ color: 'black' }} to='/'>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>

        <Link style={{ color: 'black' }} to='/browse'>
          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary='Browse' />
          </ListItem>
        </Link>

        <Link style={{ color: 'black' }} to='/createRecipe'>
          <ListItem button>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary='Create Recipe' />
          </ListItem>
        </Link>

        <Divider />

        <Link style={{ color: 'black' }} to='/account'>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='Account' />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={() => setOpen(!open)} edge='end' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Drawer anchor='right' open={open} onClose={() => setOpen(!open)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export const LoggedOutDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const list = () => (
    <div className={clsx(classes.list)} role='presentation'>
      <List>
        <Link style={{ color: 'black' }} to='/'>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>

        <Link style={{ color: 'black' }} to='/browse'>
          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary='Browse' />
          </ListItem>
        </Link>

        <Divider />

        <Link style={{ color: 'black' }} to='/loginPage'>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='Log In' />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={() => setOpen(!open)} edge='end' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Drawer anchor='right' open={open} onClose={() => setOpen(!open)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
