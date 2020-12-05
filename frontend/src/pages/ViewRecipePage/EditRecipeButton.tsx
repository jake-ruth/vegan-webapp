import { Button } from '@material-ui/core';
import React from 'react';
import { Recipe } from '../../models/Recipe';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { RecipeContext } from '../../context';

export const EditRecipeButton = () => {
  const { recipe } = React.useContext(RecipeContext);

  return (
    <Link to={`/editRecipe/${recipe!.id}`}>
      <Button
        endIcon={<EditIcon />}
        color='secondary'
        variant='contained'
        style={{ borderRadius: 0, float: 'right', margin: 10 }}>
        Edit Recipe
      </Button>
    </Link>
  );
};
