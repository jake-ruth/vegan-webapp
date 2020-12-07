import { Rating } from '@material-ui/lab';
import React from 'react';
import { Recipe } from '../../models/Recipe';
import firebase from 'firebase';
import { SettingsRemoteOutlined } from '@material-ui/icons';

interface Props {
  recipe: Recipe;
  pageTrigger?: boolean;
}

export const RecipeCardSmall = (props: Props) => {
  const [recipeImageUrl, setRecipeImageUrl] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();
    //var gsRef = storage.refFromURL('gs://vegan-webapp.appspot.com/surlyCatBeingEjected.jpg');
    const gsRef = storage.refFromURL(`gs://vegan-webapp.appspot.com/${props.recipe.imageUrlUuid}.${props.recipe.imageExtension}`);
    gsRef
      .getDownloadURL()
      .then((url: any) => {
        console.log(url);
        setRecipeImageUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRecipeImageUrl('');
        setLoading(false);
      });
  }, [props.pageTrigger]);

  if (loading) return null;

  return (
    <a className='recipe-card-small' href={`/viewRecipe/${props.recipe.id}`}>
      <img className='recipe-card-small__image' src={recipeImageUrl} />
      <div className='container'>
        <b>{props.recipe.title}</b>

        <p style={{ fontStyle: 'italic' }}>Prep time: {props.recipe.prepMinutes} min.</p>
        <p style={{ fontStyle: 'italic' }}>Cook time: {props.recipe.cookMinutes} min.</p>
        {/* <Rating name='read-only' value={5} readOnly /> */}
      </div>
    </a>
  );
};
