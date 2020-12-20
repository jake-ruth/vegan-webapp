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

  const formatTime = (totalMinutes: number) => {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min.`;
    if (minutes === 0) return `${hours} hr`;
    else return `${hours} hr, ${minutes} min.`;
  };

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
        <p style={{ fontStyle: 'italic' }}>Prep time: {formatTime(recipe.prepMinutes)}</p>
        <p style={{ fontStyle: 'italic' }}>Cook time: {formatTime(recipe.cookMinutes)}</p>
      </div>
    </a>
  );
};
