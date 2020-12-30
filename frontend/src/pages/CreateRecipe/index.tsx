import React from 'react';
import { Navbar } from '../../components/Navbar';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Typography } from '@material-ui/core';
import { Recipe } from '../../models/Recipe';
import { RecipeController } from '../../controllers/RecipeController';
import { useHistory } from 'react-router-dom';
import { CreateRecipeContent } from './components/CreateRecipeContent';
import { ImageCropper } from './components/ImageCropper';
import { UserContext } from '../../context';
import { defaultRecipe, RecipeFields } from './utils';
import { FirebaseController } from '../../controllers/FirebaseController';

export const CreateRecipe = () => {
  const { user } = React.useContext(UserContext);
  const [recipeImageFile, setRecipeImageFile] = React.useState<File>();
  const [error, setError] = React.useState<string>('');

  const history = useHistory();
  const methods = useForm<RecipeFields>({ defaultValues: defaultRecipe });

  const formatLinesToArray = (string: string): string[] => {
    let linesArray: string[] = string.split(/\n/);
    return linesArray;
  };

  const onSubmit = async (data: RecipeFields) => {
    if (!recipeImageFile) return setError('Please upload an image');

    let recipe: Recipe = {
      title: data.title,
      description: data.description,
      cookMinutes: Number(data.cookMinutes) + data.cookHours * 60,
      prepMinutes: Number(data.prepMinutes) + data.prepHours * 60,
      ingredients: formatLinesToArray(data.ingredients),
      instructions: formatLinesToArray(data.instructions),
      yieldAmount: data.yieldAmount,
      imageExtension: recipeImageFile!.name.split('.').pop()
    };

    try {
      const res = await RecipeController.createRecipe(recipe, user.uuid);
      FirebaseController.uploadRecipeImage(res!.data.imageUrlUuid, recipeImageFile!);
      history.push('/');
    } catch (err) {
      setError(JSON.stringify(err));
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h4' style={{ textAlign: 'center', margin: '0.5em' }}>
            Create Recipe
          </Typography>
          <img style={{ marginTop: 10 }} src={`${process.env.PUBLIC_URL}/images/vegetables.png`} width={55} height={55} />
        </div>
        <div className='create-recipe'>
          <FormProvider {...methods}>
            <CreateRecipeContent />
          </FormProvider>
          <br />
          <ImageCropper setRecipeImageFile={setRecipeImageFile} />

          {error.length > 0 && <div className='error'>Error creating recipe: {error}</div>}
          <Button type='submit' variant='contained' color='primary' style={{ borderRadius: 0, maxWidth: 200, marginTop: '1em' }}>
            Save Recipe!
          </Button>
        </div>
      </form>
    </div>
  );
};
