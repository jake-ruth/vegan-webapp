import { Button, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { CollectionCard } from '../../../components/CollectionCard';
import { RecipeCard } from '../../../components/RecipeCard';
import { UserContext } from '../../../context';
import { CollectionController } from '../../../controllers/CollectionController';
import { RecipeController } from '../../../controllers/RecipeController';
import { Collection } from '../../../models/Collection';
import { Recipe } from '../../../models/Recipe';
import { AddCollectionModal } from './AddCollectionModal';

export const MyRecipesTab = () => {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [recipesForUser, setRecipesForUser] = React.useState<Recipe[]>();

  React.useEffect(() => {
    RecipeController.getRecipesForUser(user.uuid)
      .then((recipes) => setRecipesForUser(recipes))
      .then(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <CircularProgress size='3rem' />}
      <Typography variant='h3'>My Recipes</Typography>
      <div className='scroll-menu'>
        {recipesForUser?.map((recipe, index) => {
          return <RecipeCard recipe={recipe} />;
        })}
      </div>
    </div>
  );
};
