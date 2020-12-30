import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import QuestionIcon from '@material-ui/icons/HelpOutline';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../../utils/AuthService';
import { LoggedInDrawer, LoggedOutDrawer } from './Drawer';

export const Navbar = () => {
  if (!AuthService.isLoggedIn()) {
    return (
      <AppBar position='static'>
        <div className='navbar__full'>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Link to='/'>
                <Typography variant='h6'>Plant Based Plates</Typography>
                {/* <img src={`${process.env.PUBLIC_URL}/images/veggiesLogo.png`} width={50} height={50} /> */}
              </Link>
            </div>

            <div>
              <Button style={{ marginLeft: 10 }} color='inherit'>
                Browse
              </Button>

              <Link to='/about'>
                <Button style={{ marginLeft: 10 }} color='inherit' endIcon={<QuestionIcon />}>
                  About
                </Button>
              </Link>

              <Link to='/loginPage'>
                <Button style={{ marginLeft: 10 }} color='inherit'>
                  Log In
                </Button>
              </Link>
            </div>
          </Toolbar>
        </div>
        <div className='navbar__mobile'>
          <div>
            <Link to='/'>
              <Typography variant='h6'>Plant Based Plates</Typography>
            </Link>
          </div>
          <div>
            <LoggedOutDrawer />
          </div>
        </div>
      </AppBar>
    );
  } else
    return (
      <AppBar position='static'>
        <div className='navbar__full'>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Link to='/' style={{ display: 'flex' }}>
                <Typography variant='h6'>Plant Based Plates</Typography>
                {/* <img src={`${process.env.PUBLIC_URL}/images/veggiesLogo.png`} width={35} height={35} style={{ marginLeft: 20 }} /> */}
              </Link>
            </div>
            <div>
              <Link to='/createRecipe'>
                <Button style={{ marginLeft: 10 }} color='inherit' endIcon={<AddIcon />}>
                  Create Recipe
                </Button>
              </Link>

              <Button style={{ marginLeft: 10 }} color='inherit'>
                Browse
              </Button>
              <Link to='/account'>
                <Button style={{ marginLeft: 10 }} color='inherit' endIcon={<AccountCircleIcon />}>
                  Account
                </Button>
              </Link>
            </div>
          </Toolbar>
        </div>
        <div className='navbar__mobile'>
          <div>
            <Link to='/'>
              <Typography variant='h6'>Plant Based Plates</Typography>
            </Link>
          </div>
          <div>
            <LoggedInDrawer />
          </div>
        </div>
      </AppBar>
    );
};
