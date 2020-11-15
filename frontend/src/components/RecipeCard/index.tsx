import { Rating } from '@material-ui/lab';
import React from 'react';
import { Recipe } from '../../models/Recipe';
import firebase from 'firebase';
import { SettingsRemoteOutlined } from '@material-ui/icons';

interface Props {
  recipe: Recipe;
  pageTrigger: boolean;
}

export const RecipeCard = (props: Props) => {
  const [recipeImageUrl, setRecipeImageUrl] = React.useState('');

  React.useEffect(() => {
    console.log('REC:', props.recipe);
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    console.log('STORE: ', storage);
    //var gsRef = storage.refFromURL('gs://vegan-webapp.appspot.com/surlyCatBeingEjected.jpg');
    const gsRef = storage.refFromURL(`gs://vegan-webapp.appspot.com/${props.recipe.imageUrlUuid}.${props.recipe.imageExtension}`);
    gsRef.getDownloadURL().then((url: any) => {
      console.log(url);
      setRecipeImageUrl(url);
    });
  }, [props.pageTrigger]);

  return (
    <a className='recipe-card' href={`/viewRecipe/${props.recipe.id}`}>
      <img className='recipe-card__image' src={recipeImageUrl} />
      <div className='container'>
        <h4>
          <b>{props.recipe.title}</b>
        </h4>
        <div className='recipe-card__description'>
          <p>{props.recipe.description}</p>
        </div>
        <p style={{ fontStyle: 'italic' }}>Prep time: {props.recipe.prepMinutes} min.</p>
        <p style={{ fontStyle: 'italic' }}>Cook time: {props.recipe.cookMinutes} min.</p>
        <Rating name='read-only' value={5} readOnly />
      </div>
    </a>
  );
};
