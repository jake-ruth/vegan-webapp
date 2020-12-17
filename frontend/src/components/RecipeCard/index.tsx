import React from 'react';
import { Recipe } from '../../models/Recipe';
import { FirebaseController } from '../../controllers/FirebaseController';

interface Props {
  recipe: Recipe;
  pageTrigger?: boolean;
}

export const RecipeCard = (props: Props) => {
  const { recipe } = props;
  const [recipeImageUrl, setRecipeImageUrl] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    FirebaseController.getImageUrl(recipe.imageUrlUuid!, recipe.imageExtension!)
      .then((url: any) => {
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
    <a className='recipe-card' href={`/viewRecipe/${recipe.id}`}>
      <img className='recipe-card__image' src={recipeImageUrl} />
      <div className='container'>
        <h4>
          <b>{recipe.title}</b>
        </h4>
        <div className='recipe-card__description'>
          <p>{recipe.description}</p>
        </div>
        <p style={{ fontStyle: 'italic' }}>Prep time: {recipe.prepMinutes} min.</p>
        <p style={{ fontStyle: 'italic' }}>Cook time: {recipe.cookMinutes} min.</p>
      </div>
    </a>
  );
};
