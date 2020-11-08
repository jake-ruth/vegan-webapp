import React from 'react';

export const Navbar = () => {
  return (
    <header className='header'>
      <a href='/' className='logo'>
        <img src={`${process.env.PUBLIC_URL}/logo.svg`} style={{ width: '250px' }} />
      </a>
      <nav>
        <ul className='nav__links'>
          <li>
            <a href='#'>Recipes</a>
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
};
