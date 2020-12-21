import { TextField, Button } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const CreateRecipeContent = () => {
  const { control, errors } = useFormContext(); // retrieve all hook methods
  return (
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
        <Controller as={TextField} control={control} name='yieldAmount' label='Yield' />
        <Controller
          as={TextField}
          control={control}
          multiline
          fullWidth
          variant='outlined'
          rows={10}
          style={{ marginTop: 20 }}
          name='ingredients'
          label='Ingredients'
          rules={{ required: 'Ingredients Required' }}
        />
      </div>
    </div>
  );
};
