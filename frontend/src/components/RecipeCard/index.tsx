import { Rating } from '@material-ui/lab';
import React from 'react';
import { Recipe } from '../../models/Recipe';

interface Props {
  recipe: Recipe;
}

export const RecipeCard = (props: Props) => {
  return (
    <a className='recipe-card' href={`/viewRecipe/${props.recipe.id}`}>
      <img className='recipe-card__image' src={`${process.env.PUBLIC_URL}/veggies.jpg`} />
      <div className='container'>
        <h4>
          <b>{props.recipe.title}</b>
        </h4>
        <div className='recipe-card__description'>
          <p>{props.recipe.description}</p>
        </div>
        <p style={{ fontStyle: 'italic' }}>Prep time: {props.recipe.prepMinutes} min.</p>
        <p style={{ fontStyle: 'italic' }}>Cook time: {props.recipe.cookMinutes} min.</p>
        <Rating name='read-only' value={5} readOnly />
      </div>
    </a>
  );
};
