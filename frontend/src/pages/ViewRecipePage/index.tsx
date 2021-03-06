import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { RecipeController } from '../../controllers/RecipeController';
import { Recipe } from '../../models/Recipe';
import { RecipeImage } from './RecipeImage';
import { RecipeContext, UserContext } from '../../context';
import { EditRecipeButton } from './EditRecipeButton';
import { Button, Divider } from '@material-ui/core';
import { DeleteRecipeButton } from './DeleteRecipeButton';
import { FavoriteButton } from './components/FavoriteButton';
import { AddToCollectionButton } from './components/AddToCollectionButton';

export const ViewRecipePage = (props: any) => {
  const [recipe, setRecipe] = React.useState<Recipe>();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    RecipeController.getRecipeById(props.match.params.recipeId)
      .then((res) => setRecipe(res!.data))
      .catch((err) => console.log(err));
  }, []);

  const formatTime = (totalMinutes: number) => {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min.`;
    else return `${hours} hours, ${minutes} min.`;
  };

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
            <p>Prep Time: {formatTime(recipe?.prepMinutes)}</p>
            <p>Cook Time: {formatTime(recipe?.cookMinutes)}</p>
            <p>Total Time: {formatTime(Number(recipe?.prepMinutes!) + Number(recipe?.cookMinutes!))}</p>
          </div>
        </div>
        <div className='view-recipe__description'>{recipe.description}</div>
        <Divider />
        <div className='view-recipe__content'>
          <div>
            <h2>Ingredients:</h2>
            <ul className='ingredients'>
              {recipe?.ingredients.map((ingredient, index) => {
                return (
                  <li key={index} className='ingredients-item current'>
                    {ingredient}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Instructions</h2>
            <ul className='instructions'>
              {recipe?.instructions.map((instruction, index) => {
                return (
                  <li key={index} className='instructions-item current'>
                    {instruction}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className='view-recipe__toolbar'>
          <AddToCollectionButton />
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
