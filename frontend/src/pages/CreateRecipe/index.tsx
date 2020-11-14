import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { Recipe } from '../../models/Recipe';
import { RecipeController } from '../../controllers/RecipeController';
import { useHistory } from 'react-router-dom';
import { RecipeImage } from './RecipeImage';
import firebase from 'firebase';

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
  const { handleSubmit, errors, control } = useForm<IFormInput>({ defaultValues: { ingredients: [{ value: '' }] } });
  const { fields, append, remove } = useFieldArray({ control, name: 'ingredients' });
  const history = useHistory();

  const [recipeImage, setRecipeImage] = React.useState('null');
  const [recipeImgageFile, setRecipeImageFile] = React.useState<File | null>(null);

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
      getBase64(e.target.files![0]).then((res) => {
        console.log('RES: ', res);
        setRecipeImage(String(res));
      });
    }
  };

  const uploadImage = (imageUuid: string) => {
    let rootRef = firebase.storage().ref();
    let fileRef = rootRef.child(imageUuid);
    let file = recipeImgageFile!;

    fileRef.put(file).then((res) => console.log(res));
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
      yieldAmount: data.yieldAmount
    };

    try {
      const res = await RecipeController.createRecipe(recipe);
      console.log('RES: ', res);
      uploadImage(res!.data.imageUrlUuid);

      //history.push('/');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  const style = {
    style: {
      fontFamily: 'Verdana'
    }
  };

  return (
    <div>
      <Navbar />
      <form onChange={(e: any) => setImageFile(e)} onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ textAlign: 'center' }}>Create Recipe</h1>
        <div className='create-recipe'>
          <div className='create-recipe__content'>
            <div className='create-recipe__section'>
              <Controller
                as={TextField}
                control={control}
                rules={{ required: 'Title Required' }}
                type='text'
                id='title'
                name='title'
                label='Title'
                fullWidth
              />
              <div className='error'>{errors.title && errors.title.message}</div>

              <Controller
                as={TextField}
                control={control}
                multiline
                fullWidth
                variant='outlined'
                rows={5}
                style={{ marginTop: 20 }}
                name='description'
                label='Description'
                rules={{ required: 'Description Required' }}
              />
              <div className='error'>{errors.description && errors.description.message}</div>

              <Controller
                as={TextField}
                control={control}
                multiline
                fullWidth
                variant='outlined'
                rows={10}
                style={{ marginTop: 20 }}
                name='instructions'
                label='Instructions'
                rules={{ required: 'Instructions Required' }}
              />
              <div className='error'>{errors.description && errors.description.message}</div>
            </div>

            <div className='create-recipe__section'>
              <h3 style={{ fontStyle: 'italic' }}>Prep Time</h3>
              <div style={{ display: 'flex' }}>
                <Controller as={TextField} control={control} type='number' name='prepHours' label='Hours' defaultValue={0} />
                <Controller as={TextField} control={control} type='number' name='prepMinutes' label='Minutes' defaultValue={0} />
              </div>

              <h3 style={{ fontStyle: 'italic' }}>Cook Time</h3>
              <div style={{ display: 'flex' }}>
                <Controller as={TextField} control={control} type='number' name='cookHours' label='Hours' defaultValue={0} />
                <Controller as={TextField} control={control} type='number' name='cookMinutes' label='Minutes' defaultValue={0} />
              </div>
              <h3 style={{ fontStyle: 'italic' }}>Ingredients</h3>

              {fields.map((ingredient, index) => (
                <div style={{ display: 'flex' }}>
                  <Controller as={TextField} fullWidth name={`ingredients[${index}].value`} control={control} />
                  <Button
                    variant='contained'
                    size='small'
                    style={{ borderRadius: 0 }}
                    color='secondary'
                    onClick={() => remove(index)}>
                    Delete
                  </Button>
                </div>
              ))}
              <Button
                type='button'
                style={{ marginTop: '1em' }}
                variant='contained'
                color='primary'
                size='small'
                onClick={() => append({ value: '' })}>
                Add Ingredient
              </Button>
            </div>
          </div>

          <br />

          <Controller as={TextField} control={control} name='yieldAmount' label='Yield' />
          <input className='file-uploader' type='file' accept='.jpg,.jpeg,.png' />
          <img src={recipeImage} height={200} width={200} style={{ objectFit: 'cover' }} />
          <Button type='submit' variant='contained' color='primary' style={{ borderRadius: 0, maxWidth: 200, marginTop: '1em' }}>
            Save Recipe!
          </Button>
        </div>
      </form>
    </div>
  );
};
