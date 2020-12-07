import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { RecipeCard } from '../../components/RecipeCard';
import { UserContext } from '../../context';
import { ApplicationUserController } from '../../controllers/ApplicationUserController';
import { RecipeController } from '../../controllers/RecipeController';
import { ApplicationUser } from '../../models/ApplicationUser';
import { Recipe } from '../../models/Recipe';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RecipeCardSmall } from '../../components/RecipeCard/RecipeCardSmall';
import { AccountPageTabs } from './AccountPageTabs';

export const AccountPage = () => {
  const history = useHistory();
  const { user } = React.useContext(UserContext);
  const [currentUser, setCurrentUser] = React.useState<ApplicationUser>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [recipesForUser, setRecipesForUser] = React.useState<Recipe[]>();

  React.useEffect(() => {
    ApplicationUserController.getApplicationUser(user.uuid).then((userObject) => {
      setCurrentUser(userObject);
      setLoading(false);
    });

    RecipeController.getRecipesForUser(user.uuid).then((recipes) => {
      setRecipesForUser(recipes);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <AccountPageTabs />
      {loading && <CircularProgress size='3rem' />}
      <h2>Good afternoon {currentUser?.firstName}!</h2>
      <h2>Your Recipes:</h2>
      <div className='scroll-menu'>
        {recipesForUser?.map((recipe, index) => {
          return <RecipeCard recipe={recipe} />;
        })}
      </div>
      <h2>Your Favorite Recipes:</h2>
      <div className='scroll-menu'>
        {recipesForUser?.map((recipe, index) => {
          return <RecipeCard recipe={recipe} />;
          // return <RecipeCardSmall recipe={recipe} />;
        })}
      </div>
    </div>
  );
};
