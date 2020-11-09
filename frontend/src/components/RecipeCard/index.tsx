import React from 'react';
import { Recipe } from '../../models/Recipe';

interface Props {
  recipe: Recipe;
}

export const RecipeCard = (props: Props) => {
  return (
    <a className='recipe-card' style={{ display: 'flex' }} href={`/viewRecipe/${props.recipe.id}`}>
      <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} style={{ width: '10em', objectFit: 'cover' }} />
      <div className='container'>
        <h4>
          <b>{props.recipe.title}</b>
        </h4>
        <p>{props.recipe.description}</p>
      </div>
    </a>
  );
};
