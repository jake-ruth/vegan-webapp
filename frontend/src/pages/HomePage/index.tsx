import React from 'react';
import { Navbar } from '../../components/Navbar';
import { RecipeCard } from '../../components/RecipeCard';
import { Footer } from '../../components/Footer';
import { ApplicationUserController } from '../../controllers/ApplicationUserController';
import { RecipeController } from '../../controllers/RecipeController';
import { Recipe } from '../../models/Recipe';

export const HomePage = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    RecipeController.pageRecipes(1).then((res: any) => {
      setRecipes(res.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Good Afternoon, Jake!</h1>
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
      </div>

      <div className='container'>
        <h2>New Recipes:</h2>
        <div className='recipe-card-container'>{/* <RecipeCard />
          <RecipeCard />
          <RecipeCard /> */}</div>
        <hr />
        <h2>All Recipes:</h2>
        <div className='recipe-card-container'>
          {recipes.map((recipe, index) => {
            return <RecipeCard key={index} recipe={recipe} />;
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};
