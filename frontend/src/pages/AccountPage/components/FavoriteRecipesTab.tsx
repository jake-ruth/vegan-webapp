import { Typography } from '@material-ui/core';
import React from 'react';
import { RecipeCard } from '../../../components/RecipeCard';
import { UserContext } from '../../../context';
import { FavoriteController } from '../../../controllers/FavoriteController';

export const FavoriteRecipesTab = () => {
  const { user } = React.useContext(UserContext);
  const [favoriteRecipes, setFavoriteRecipes] = React.useState<any[]>();

  React.useEffect(() => {
    FavoriteController.getFavoriteRecipes(user.id!).then((res: any) => setFavoriteRecipes(res.data));
  }, []);

  if (!favoriteRecipes?.length)
    return (
      <div>
        <Typography variant='h4'>Favorite Recipes</Typography>
        <div>
          You do not have any favorites saved -{' '}
          <a href='/' style={{ color: 'black', textDecoration: 'underline' }}>
            View All Recipes
          </a>
        </div>
      </div>
    );

  return (
    <div>
      <Typography variant='h4'>Favorite Recipes</Typography>
      <div className='scroll-menu'>
        {favoriteRecipes?.map((favorite, index) => {
          return <RecipeCard recipe={favorite.recipe} />;
        })}
      </div>
    </div>
  );
};
