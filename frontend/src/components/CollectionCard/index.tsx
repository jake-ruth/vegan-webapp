import { Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CollectionRecipeController } from '../../controllers/CollectionRecipeController';
import { FirebaseController } from '../../controllers/FirebaseController';
import { Collection } from '../../models/Collection';
import { CollectionRecipe } from '../../models/CollectionRecipe';

interface Props {
  collection: Collection;
}

export const CollectionCard = (props: Props) => {
  const history = useHistory();
  const [collectionRecipes, setCollectionRecipes] = React.useState<CollectionRecipe[]>();
  const [recipeImgUrls, setRecipeImgUrls] = React.useState<string[]>([]);
  const [imgPlaceholderCount, setImgPlaceholderCount] = React.useState<string[]>(['', '', '', '']);

  React.useEffect(() => {
    CollectionRecipeController.getCollectionRecipesByCollection(props.collection.id!).then((collectionRecipes) => {
      setCollectionRecipes(collectionRecipes);

      if (collectionRecipes) {
        collectionRecipes.map((collectionRecipe: CollectionRecipe, index: number) => {
          if (index < 4) {
            FirebaseController.getImageUrl(collectionRecipe.recipe.imageUrlUuid!, collectionRecipe.recipe.imageExtension!)
              .then((url: any) => setRecipeImgUrls((recipeImgUrls) => [...recipeImgUrls, url]))
              .catch((err) => console.log(err));
          }
        });
      }
    });
  }, []);

  React.useEffect(() => {
    setImgPlaceholderCount(new Array(4 - recipeImgUrls.length).fill(''));
  }, [recipeImgUrls]);

  return (
    <div
      className='collection-card'
      onClick={() => history.push(`/viewCollection/${props.collection.title}/${props.collection.id}`)}>
      <div className='collection-card__img-container'>
        {recipeImgUrls.map((url: any) => {
          return <img src={url} className='collection-card__img' />;
        })}

        {imgPlaceholderCount.map((placeholder: any, index: number) => {
          return <div key={index} className='collection-card__img-placeholder' />;
        })}
      </div>

      <Typography className='collection-card__title' style={{ textAlign: 'center' }} variant='h5'>
        {props.collection.title}
      </Typography>
      <div>{collectionRecipes?.length} recipes</div>
    </div>
  );
};
