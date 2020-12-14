import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { RecipeController } from '../../controllers/RecipeController';
import { Recipe } from '../../models/Recipe';
import { RecipeImage } from './RecipeImage';
import { RecipeContext, UserContext } from '../../context';
import { EditRecipeButton } from './EditRecipeButton';
import { Button, Divider, Snackbar, Typography } from '@material-ui/core';
import { DeleteRecipeButton } from './DeleteRecipeButton';
import { FavoriteButton } from './components/FavoriteButton';

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
    <RecipeContext.Provider value={{ recipe, setRecipe }}>
      <Navbar />
      {recipe.applicationUser.uuid === user.uuid && <EditRecipeButton />}
      {recipe.applicationUser.uuid === user.uuid && <DeleteRecipeButton />}
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
        <div className='view-recipe__description'>{recipe.description}</div>
        <Divider />
        <div className='view-recipe__content'>
          <div>
            <h2>Ingredients:</h2>
            <ul className='view-recipe__ingredients'>
              {recipe?.ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <div className='view-recipe__item'>
            <h2>Instructions:</h2>
            <div className='view-recipe__instructions'>
              <Typography variant='body1'>{recipe?.instructions}</Typography>
            </div>
          </div>
        </div>
        <Divider />

        <div className='view-recipe__toolbar'>
          <Button
            color='secondary'
            variant='contained'
            style={{ borderRadius: 0, marginRight: '1em' }}
            onClick={() => window.print()}>
            Print Recipe
          </Button>
          <FavoriteButton />
        </div>
      </div>
      <Footer />
    </RecipeContext.Provider>
  );
};
