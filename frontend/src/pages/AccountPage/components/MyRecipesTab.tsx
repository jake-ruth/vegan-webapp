import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { RecipeCard } from '../../../components/RecipeCard';
import { CreateRecipeCard } from '../../../components/RecipeCard/CreateRecipeCard';
import { RecipePlaceholderCard } from '../../../components/RecipeCard/RecipePlaceholderCard';
import { UserContext } from '../../../context';
import { RecipeController } from '../../../controllers/RecipeController';
import { Recipe } from '../../../models/Recipe';

export const MyRecipesTab = () => {
  const { user } = React.useContext(UserContext);
  const [recipesForUser, setRecipesForUser] = React.useState<Recipe[]>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    RecipeController.getRecipesForUser(user.uuid)
      .then((recipes) => setRecipesForUser(recipes))
      .then(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div>
        <Typography variant='h4'>My Recipes</Typography>
        <div className='scroll-menu'>
          <RecipePlaceholderCard />
          <RecipePlaceholderCard />
          <RecipePlaceholderCard />
          <RecipePlaceholderCard />
        </div>
      </div>
    );

  if (!recipesForUser?.length) return <div>You have not created any recipes yet</div>;

  return (
    <div>
      <Typography variant='h4'>My Recipes</Typography>
      <div className='scroll-menu'>
        <CreateRecipeCard />

        {recipesForUser?.map((recipe, index) => {
          return <RecipeCard key={index} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};
