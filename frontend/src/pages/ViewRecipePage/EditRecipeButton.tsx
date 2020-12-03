import { Button } from '@material-ui/core';
import React from 'react';
import { Recipe } from '../../models/Recipe';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
  recipe: Recipe;
}

export const EditRecipeButton = (props: Props) => {
  return (
    <Link to={`/editRecipe/${props.recipe.id}`}>
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
