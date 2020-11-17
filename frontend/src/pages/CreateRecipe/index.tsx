import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { Recipe } from '../../models/Recipe';
import { RecipeController } from '../../controllers/RecipeController';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { CreateRecipeContent } from './components/CreateRecipeContent';
import { CropTest } from './components/CropTest';

interface IFormInput {
  title: string;
  description: string;
  instructions: string;
  ingredients: any[];
  prepHours: number;
  prepMinutes: number;
  cookHours: number;
  cookMinutes: number;
  yieldAmount: string;
}

export const CreateRecipe = () => {
  const methods = useForm<IFormInput>({ defaultValues: { ingredients: [{ value: '' }] } });

  const history = useHistory();
  const [recipeImageFile, setRecipeImageFile] = React.useState<File | null>(null);

  const uploadImage = (imageUuid: string) => {
    const fileExtension = recipeImageFile!.name.split('.').pop();

    let rootRef = firebase.storage().ref();
    let fileRef = rootRef.child(`${imageUuid}.${fileExtension}`);

    fileRef.put(recipeImageFile!).then((res) => console.log(res));
  };

  const onSubmit = async (data: IFormInput, e: any) => {
    const formatIngredients = () => {
      let ingredientsArray: string[] = [];
      data.ingredients.map((ingredient: any) => {
        ingredientsArray.push(ingredient.value);
      });

      return ingredientsArray;
    };

    let recipe: Recipe = {
      title: data.title,
      description: data.description,
      cookMinutes: Number(data.cookMinutes) + data.cookHours * 60,
      prepMinutes: Number(data.prepMinutes) + data.prepHours * 60,
      ingredients: formatIngredients(),
      instructions: data.instructions,
      yieldAmount: data.yieldAmount,
      imageExtension: recipeImageFile!.name.split('.').pop()
    };

    try {
      const res = await RecipeController.createRecipe(recipe);
      uploadImage(res!.data.imageUrlUuid);
      history.push('/');
    } catch (err) {
      console.log('ERR: ', err);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: 'center' }}>Create Recipe</h1>
        <div className='create-recipe'>
          <FormProvider {...methods}>
            <CreateRecipeContent />
          </FormProvider>
          <br />
          <CropTest setRecipeImageFile={setRecipeImageFile} />
          <Button type='submit' variant='contained' color='primary' style={{ borderRadius: 0, maxWidth: 200, marginTop: '1em' }}>
            Save Recipe!
          </Button>
        </div>
      </form>
    </div>
  );
};
