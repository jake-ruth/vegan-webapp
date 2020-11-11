import React from 'react';
import { Navbar } from '../../components/Navbar';
import { RecipeCard } from '../../components/RecipeCard';
import { Footer } from '../../components/Footer';
import { ApplicationUserController } from '../../controllers/ApplicationUserController';
import { RecipeController } from '../../controllers/RecipeController';
import { Recipe } from '../../models/Recipe';
import { Button } from '@material-ui/core';

export const HomePage = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [page, setPage] = React.useState<number>(0);

  React.useEffect(() => {
    RecipeController.pageRecipes(page).then((res: any) => {
      setRecipes(res.data);
    });
  }, [page]);

  return (
    <div>
      <Navbar />
      {/* <h1 style={{ textAlign: 'center' }}>Good Afternoon, Jake!</h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
        "An object for pleasure and not a living breathing human being. It seems to make it easier to do things you shouldn't do."
        - Jeffery Dahmer
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
      </div> */}

      <div className='container'>
        <h2>All Recipes:</h2>
        <div className='recipe-card-container'>
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
          <Button onClick={() => page !== 0 && setPage(page - 1)}>Previous Page</Button>
          <Button onClick={() => setPage(page + 1)}>Next Page</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
