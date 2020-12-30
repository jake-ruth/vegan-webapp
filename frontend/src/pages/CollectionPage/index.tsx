import { Typography } from '@material-ui/core';
import React from 'react';
import { Navbar } from '../../components/Navbar';
import { RecipeCard } from '../../components/RecipeCard';
import { CollectionRecipeController } from '../../controllers/CollectionRecipeController';
import { CollectionRecipe } from '../../models/CollectionRecipe';

export const CollectionRecipesPage = (props: any) => {
  const [collectionRecipes, setCollectionRecipes] = React.useState<CollectionRecipe[]>();
  const collectionId = props.match.params.collectionId;

  React.useEffect(() => {
    CollectionRecipeController.getCollectionRecipesByCollection(collectionId).then((collectionRecipes) =>
      setCollectionRecipes(collectionRecipes)
    );
  }, []);

  if (collectionRecipes === undefined) return null;

  if (collectionRecipes!.length)
    return (
      <div>
        <Navbar />
        <Typography variant='h4'>{props.match.params.title}</Typography>
        <div className='recipe-card-container'>
          {collectionRecipes?.map((collectionRecipe) => {
            return <RecipeCard recipe={collectionRecipe.recipe} />;
          })}
        </div>
      </div>
    );

  return null;
};
