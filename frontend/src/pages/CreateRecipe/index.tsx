import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { Recipe } from '../../models/Recipe';
import { RecipeController } from '../../controllers/RecipeController';
import { useHistory } from 'react-router-dom';

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ fontStyle: 'italic', textAlign: 'center' }}>Create Recipe</h1>
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

          <Button type='submit' variant='contained' color='primary' style={{ borderRadius: 0, maxWidth: 200, marginTop: '1em' }}>
            Save Recipe!
          </Button>
        </div>
      </form>
    </div>
  );
};
