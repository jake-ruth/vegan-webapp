import React from 'react';
import { Navbar } from '../../components/Navbar';
import { RecipeCard } from '../../components/RecipeCard';
import { Footer } from '../../components/Footer';

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Good Afternoon, Jake!</h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
        "Today is a new day. Your food shall be thine choice. Become one with your food." - Jeffery Dhomer
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 2em' }}>
        <div style={{ width: '30vw', justifyItems: 'center' }}>
          <input type='text' placeholder='Search for recipes...' />
        </div>
        <select>
          <option>New Recipes</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Dessert</option>
        </select>
      </div>

      <div className='container'>
        <h2>New Recipes:</h2>
        <div className='recipe-card-container'>
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
        <hr />
        <h2>All Recipes:</h2>
        <div className='recipe-card-container'>
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>

      <Footer />
    </div>
  );
};
