import firebase from 'firebase';
import React from 'react';
import { Recipe } from '../../models/Recipe';

interface Props {
  recipe: Recipe;
}

export const RecipeImage = (props: Props) => {
  const [recipeImageUrl, setRecipeImageUrl] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    var storage = firebase.storage();

    const gsRef = storage.refFromURL(`gs://vegan-webapp.appspot.com/${props.recipe.imageUrlUuid}.${props.recipe.imageExtension}`);
    gsRef
      .getDownloadURL()
      .then((url: any) => {
        console.log(url);
        setRecipeImageUrl(url);
      })
      .then(() => setLoading(false));
  }, [props.recipe]);

  if (loading) return null;

  return <img src={recipeImageUrl} style={{ objectFit: 'cover' }} alt='recipe image' className='view-recipe__img' />;
};
