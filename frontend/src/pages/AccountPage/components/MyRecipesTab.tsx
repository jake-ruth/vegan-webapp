import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { RecipeCard } from '../../../components/RecipeCard';
import { UserContext } from '../../../context';
import { RecipeController } from '../../../controllers/RecipeController';
import { Recipe } from '../../../models/Recipe';

export const MyRecipesTab = () => {
  const { user } = React.useContext(UserContext);
  const [recipesForUser, setRecipesForUser] = React.useState<Recipe[]>();

  React.useEffect(() => {
    RecipeController.getRecipesForUser(user.uuid).then((recipes) => setRecipesForUser(recipes));
  }, []);

  if (!recipesForUser?.length) return <div>You have not created any recipes yet</div>;

  return (
    <div>
      <Typography variant='h3'>My Recipes</Typography>
      <div className='scroll-menu'>
        {recipesForUser?.map((recipe, index) => {
          return <RecipeCard key={index} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};
