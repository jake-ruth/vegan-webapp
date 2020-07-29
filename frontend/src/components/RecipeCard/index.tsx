import React from 'react';

interface Props {}

export const RecipeCard = (props: Props) => {
  return (
    <a className='recipe-card' style={{ display: 'flex' }} href='/viewRecipe'>
      <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} alt='Avatar' style={{ width: '10em', objectFit: 'cover' }} />
      <div className='container'>
        <h4>
          <b>Tempeh Stirfry</b>
        </h4>
        <p>A magical recipe. This potion will kill your first born child and allow you to fly.</p>
      </div>
    </a>
  );
};
