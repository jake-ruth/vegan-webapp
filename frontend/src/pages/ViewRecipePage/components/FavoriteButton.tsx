import React from 'react';
import { RecipeContext, UserContext } from '../../../context';
import { Button, Snackbar } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FavoriteController } from '../../../controllers/FavoriteController';
import { Alert } from '@material-ui/lab';

export const FavoriteButton = () => {
  const { recipe } = React.useContext(RecipeContext);
  const { user } = React.useContext(UserContext);
  const [addedToFavorites, setAddedToFavorites] = React.useState<boolean>(false);
  const [isInFavorites, setIsInFavorites] = React.useState<boolean>(false);
  const [favoriteRecord, setFavoriteRecord] = React.useState({ id: 0 });

  React.useEffect(() => {
    FavoriteController.getFavoriteRecipes(user.id!).then((res) => {
      if (res?.data.length) {
        res?.data.forEach((favorite: any) => {
          if (favorite.recipe.id === recipe!.id) {
            setIsInFavorites(true);
            setFavoriteRecord(favorite);
          }
        });
      }
    });
  }, []);

  const handleFavoriteRecipe = () => {
    if (isInFavorites) {
      FavoriteController.deleteFavoriteRecipe(favoriteRecord!.id!).then(() => {
        setAddedToFavorites(false);
        setIsInFavorites(false);
      });
    } else {
      FavoriteController.addRecipeToFavorites(recipe!.id!, user.id!).then(() => {
        setIsInFavorites(true);
        setAddedToFavorites(true);
      });
    }
  };

  if (recipe == null) return null;

  return (
    <div>
      <Button
        endIcon={<FavoriteIcon />}
        color='primary'
        variant='contained'
        style={{ borderRadius: 0, marginLeft: '1em' }}
        onClick={() => handleFavoriteRecipe()}>
        {isInFavorites ? 'Remove From Favorites' : 'Add To Favorites'}
      </Button>

      <Snackbar open={addedToFavorites} autoHideDuration={6000} onClose={() => setAddedToFavorites(false)}>
        <Alert onClose={() => setAddedToFavorites(false)} severity='info'>
          Added to Favorites!
        </Alert>
      </Snackbar>
    </div>
  );
};
