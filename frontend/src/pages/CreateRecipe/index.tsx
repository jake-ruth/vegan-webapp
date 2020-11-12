import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { Button, Divider, TextField } from '@material-ui/core';
import { Recipe } from '../../models/Recipe';
import { RecipeController } from '../../controllers/RecipeController';
import { useHistory } from 'react-router-dom';

interface IFormInput {
  title: string;
  description: string;
  instructions: string;
  ingredients: string[];
  prepHours: number;
  prepMinutes: number;
  cookHours: number;
  cookMinutes: number;
  yieldAmount: string;
}

export const CreateRecipe = () => {
  const { handleSubmit, errors, control } = useForm<IFormInput>();
  const { fields, append, remove } = useFieldArray({ control, name: 'ingredients' });
  const history = useHistory();

  const onSubmit = async (data: IFormInput) => {
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
      await RecipeController.createRecipe(recipe);
      history.push('/');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} className='login-page__card'>
        <h1 style={{ fontStyle: 'italic', textAlign: 'center' }}>Create Recipe</h1>
        <div className='create-recipe'>
          <Controller
            as={TextField}
            control={control}
            rules={{ required: 'Title Required' }}
            type='text'
            id='title'
            name='title'
            label='Title'
          />
          <div className='error'>{errors.title && errors.title.message}</div>

          <Controller
            as={TextField}
            control={control}
            multiline
            variant='outlined'
            rows={5}
            name='description'
            label='Description'
            rules={{ required: 'Description Required' }}
          />
          <div className='error'>{errors.description && errors.description.message}</div>

          <Controller
            as={TextField}
            control={control}
            multiline
            variant='outlined'
            rows={5}
            name='instructions'
            label='Instructions'
            rules={{ required: 'Instructions Required' }}
          />
          <div className='error'>{errors.description && errors.description.message}</div>

          <h3 style={{ fontStyle: 'italic' }}>Ingredients</h3>

          <ul>
            {fields.map((ingredient, index) => (
              <li key={index}>
                <Controller as={TextField} name={`ingredients[${index}].value`} control={control} />

                <Button
                  variant='contained'
                  size='small'
                  style={{ borderRadius: 0 }}
                  color='secondary'
                  onClick={() => remove(index)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>

          <Button type='button' onClick={() => append({ value: '' })}>
            Add Ingredient
          </Button>

          <Divider />
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

          <br />

          <Controller as={TextField} control={control} name='yieldAmount' label='Yield' />

          <Button type='submit' variant='contained' color='primary' style={{ borderRadius: 0 }}>
            Save Recipe!
          </Button>
        </div>
      </form>
    </div>
  );
};
