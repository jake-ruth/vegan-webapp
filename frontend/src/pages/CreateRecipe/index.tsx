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

  const [recipeImage, setRecipeImage] = React.useState('null');
  const [recipeImageFile, setRecipeImageFile] = React.useState<File | null>(null);

  // convert file into base64
  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const setImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    if (e.target.files !== undefined && e.target.files !== null) {
      setRecipeImageFile(e.target.files![0]);
      getBase64(e.target.files![0]).then((res) => {
        console.log('RES: ', res);
        setRecipeImage(String(res));
      });
    }
  };

  const uploadImage = (imageUuid: string) => {
    const fileExtension = recipeImageFile!.name.split('.').pop();

    let rootRef = firebase.storage().ref();
    let fileRef = rootRef.child(`${imageUuid}.${fileExtension}`);

    fileRef.put(recipeImageFile!).then((res) => console.log(res));
  };

  const onSubmit = async (data: IFormInput, e: any) => {
    console.log('FILES! ', e.target.files);
    const getIngredients = () => {
      let ingredientsArray: string[] = [];
      data.ingredients.map((ingredient: any) => {
        ingredientsArray.push(ingredient.value);
      });

      return ingredientsArray;
    };

    let recipe: Recipe = {
      title: data.title,
      description: data.description,
      cookMinutes: data.cookHours * 60 + data.cookMinutes,
      prepMinutes: Number(data.prepMinutes) + data.prepHours * 60,
      ingredients: getIngredients(),
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
      <form onChange={(e: any) => setImageFile(e)} onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: 'center' }}>Create Recipe</h1>
        <div className='create-recipe'>
          <FormProvider {...methods}>
            <CreateRecipeContent />
          </FormProvider>
          <br />

          <Controller as={TextField} control={methods.control} name='yieldAmount' label='Yield' />
          <CropTest setRecipeImageFile={setRecipeImageFile} />
          <Button type='submit' variant='contained' color='primary' style={{ borderRadius: 0, maxWidth: 200, marginTop: '1em' }}>
            Save Recipe!
          </Button>
        </div>
      </form>
    </div>
  );
};
