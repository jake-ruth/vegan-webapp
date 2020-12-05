import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Button, CircularProgress } from '@material-ui/core';
import { RecipeController } from '../../controllers/RecipeController';
import { EditRecipeForm } from './components/EditRecipeForm';

export const EditRecipe = (props: any) => {
  const [recipeImageFile, setRecipeImageFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [recipe, setRecipe] = React.useState<any>({});

  React.useEffect(() => {
    RecipeController.getRecipeById(props.match.params.recipeId)
      .then((res) => {
        setRecipe(res!.data);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Navbar />
      <EditRecipeForm recipe={recipe} />
    </div>
  );
};
