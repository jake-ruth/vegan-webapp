import firebase from 'firebase';
import React from 'react';
import { FirebaseController } from '../../controllers/FirebaseController';
import { Recipe } from '../../models/Recipe';

interface Props {
  recipe: Recipe;
}

export const RecipeImage = (props: Props) => {
  const { recipe } = props;
  const [recipeImageUrl, setRecipeImageUrl] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    FirebaseController.getImageUrl(recipe.imageUrlUuid!, recipe.imageExtension!)
      .then((url: any) => setRecipeImageUrl(url))
      .then(() => setLoading(false));
  }, [recipe]);

  if (loading) return null;

  return <img src={recipeImageUrl} style={{ objectFit: 'cover' }} alt='recipe image' className='view-recipe__img' />;
};
