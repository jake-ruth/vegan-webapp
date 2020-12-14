import { Button, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { Navbar } from '../../../components/Navbar';
import { RecipeCard } from '../../../components/RecipeCard';
import { UserContext } from '../../../context';
import { ApplicationUserController } from '../../../controllers/ApplicationUserController';
import { FavoriteController } from '../../../controllers/FavoriteController';
import { RecipeController } from '../../../controllers/RecipeController';
import { ApplicationUser } from '../../../models/ApplicationUser';
import { Recipe } from '../../../models/Recipe';
import { AccountPageTabs } from '../AccountPageTabs';

export const FavoriteRecipesTab = () => {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [favoriteRecipes, setFavoriteRecipes] = React.useState<any[]>();

  React.useEffect(() => {
    FavoriteController.getFavoriteRecipes(user.id!)
      .then((res: any) => {
        console.log(res);
        setFavoriteRecipes(res.data);
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <CircularProgress size='3rem' />}
      <Typography variant='h3'>Favorite Recipes</Typography>
      <div className='scroll-menu'>
        {favoriteRecipes?.map((favorite, index) => {
          return <RecipeCard recipe={favorite.recipe} />;
        })}
      </div>
    </div>
  );
};
