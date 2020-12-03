import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { RecipeController } from '../../controllers/RecipeController';
import { Recipe } from '../../models/Recipe';
import { RecipeImage } from './RecipeImage';
import { UserContext } from '../../context';
import { EditRecipeButton } from './EditRecipeButton';

export const ViewRecipePage = (props: any) => {
  const [recipe, setRecipe] = React.useState<Recipe | null>(null);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    RecipeController.getRecipeById(props.match.params.recipeId)
      .then((res) => setRecipe(res!.data))
      .catch((err) => console.log(err));
  }, []);

  if (recipe == null) return null;

  return (
    <div>
      <Navbar />
      {recipe.applicationUser.uuid === user.uuid && <EditRecipeButton recipe={recipe} />}
      <div className='view-recipe'>
        <div className='view-recipe__header'>
          <RecipeImage recipe={recipe} />
          <div>
            <h1>{recipe?.title}</h1>
            <p>Prep Time: {recipe?.prepMinutes} minutes</p>
            <p>Cook Time: {recipe?.cookMinutes} minutes</p>
            <p>Total Time: {Number(recipe?.prepMinutes!) + Number(recipe?.cookMinutes!)} minutes</p>
          </div>
        </div>
        <div>{recipe.description}</div>
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
