import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { RecipeController } from '../../controllers/RecipeController';
import { Recipe } from '../../models/Recipe';

export const ViewRecipePage = (props: any) => {
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);

  React.useEffect(() => {
    RecipeController.getRecipeById(props.match.params.recipeId).then((res) => {
      console.log('RES: ', res);

      setRecipe(res!.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className='view-recipe'>
        <div className='view-recipe__header'>
          <img src={`${process.env.PUBLIC_URL}/veggieStirFry.jpg`} alt='stir fry' className='view-recipe__img' />
          <div>
            <h1>{recipe?.title}</h1>
            <p>Prep Time: {recipe?.prepMinutes} minutes</p>
            <p>Cook Time: {recipe?.cookMinutes} minutes</p>
            <p>Total Time: {Number(recipe?.prepMinutes!) + Number(recipe?.cookMinutes!)} minutes</p>
          </div>
        </div>
        <hr />
        <div className='view-recipe__content'>
          <div className='view-recipe__item'>
            <h2>Ingredients:</h2>
            <ul>
              {recipe?.ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <div className='view-recipe__item'>
            <h2>Instructions:</h2>
            <p className='view-recipe__instructions'>{recipe?.instructions}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
