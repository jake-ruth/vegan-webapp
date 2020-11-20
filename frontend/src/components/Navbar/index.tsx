import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../../utils/AuthService';

export const Navbar = () => {
  if (!AuthService.isLoggedIn()) {
    return (
      <header className='header'>
        <a href='/' className='logo'>
          <img src={`${process.env.PUBLIC_URL}/logo.svg`} style={{ width: '250px' }} />
        </a>
        <nav>
          <ul className='nav__links'>
            <li>
              <a href='#'>Browse</a>
            </li>
            <li>
              <a href='/about'>About</a>
            </li>
          </ul>
        </nav>
        <a className='cta' href='/loginPage'>
          <button className='btn-primary'>Log In</button>
        </a>
      </header>
    );
  } else
    return (
      <AppBar position='static'>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Link to='/'>
              <Typography variant='h6'>Plant Based Plates</Typography>
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
      </AppBar>
    );
};
