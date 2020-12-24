import { Button, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { Navbar } from '../../../components/Navbar';
import { RecipeCard } from '../../../components/RecipeCard';
import { UserContext } from '../../../context';
import { ApplicationUserController } from '../../../controllers/ApplicationUserController';
import { CollectionController } from '../../../controllers/CollectionController';
import { RecipeController } from '../../../controllers/RecipeController';
import { ApplicationUser } from '../../../models/ApplicationUser';
import { Recipe } from '../../../models/Recipe';
import { AccountPageTabs } from '../AccountPageTabs';

export const MyRecipesTab = () => {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [recipesForUser, setRecipesForUser] = React.useState<Recipe[]>();

  React.useEffect(() => {
    RecipeController.getRecipesForUser(user.uuid)
      .then((recipes) => {
        setRecipesForUser(recipes);
      })
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
      <div style={{ display: 'flex', marginTop: 30 }}>
        <Typography variant='h3'>Recipe Collections</Typography>
        <Button
          style={{ borderRadius: 0 }}
          variant='contained'
          color='primary'
          title='Add Collection'
          onClick={async () => await CollectionController.createCollection('test collection', user.id!)}>
          Add Collection
        </Button>
      </div>
      <div className='scroll-menu'>
        <div>Display user's collections here</div>
      </div>
    </div>
  );
};
