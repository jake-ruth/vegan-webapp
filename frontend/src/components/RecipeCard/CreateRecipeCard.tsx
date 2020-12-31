import { Icon, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const CreateRecipeCard = () => {
  return (
    <div className='recipe-card' style={{ backgroundColor: 'white' }}>
      <Link to='/createRecipe'>
        <div
          className='container'
          style={{
            color: 'black',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Typography style={{ margin: 15 }} variant='h5'>
            Create Recipe
          </Typography>

          <AddCircleIcon />
        </div>
      </Link>
    </div>
  );
};
