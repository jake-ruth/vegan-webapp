import React from 'react';
import { Navbar } from '../../components/Navbar';
import { useForm } from 'react-hook-form';

interface IFormInput {
  title: string;
  description: string;
  instructions: string;
  ingredients: string[];
  prepMinutes: number;
  cookMinutes: number;
}

export const CreateRecipe = () => {
  const { register, handleSubmit, errors } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} className='login-page__card'>
        <h1 style={{ fontStyle: 'italic', textAlign: 'center' }}>Create Recipe</h1>
        <div className='create-recipe'>
          <div className='field'>
            <input type='text' id='title' name='title' ref={register({ required: 'Title required' })} placeholder=' ' />
            <label htmlFor='title'>Title</label>
          </div>
          <div className='error'>{errors.title && errors.title.message}</div>
          <div className='field'>
            <input
              type='text'
              name='description'
              id='description'
              ref={register({ required: 'Description required' })}
              placeholder=' '
            />
            <label htmlFor='description'>Description</label>
          </div>
          <div className='error'>{errors.description && errors.description.message}</div>

          <div style={{ display: 'flex' }}>
            <div className='field'>
              <input
                type='number'
                defaultValue={0}
                min={0}
                id='prepTimeHours'
                name='prepTimeHours'
                ref={register({ required: 'Prep Time required' })}
                placeholder=' '
              />
              <label htmlFor='prepTimeHours'>Hours</label>
            </div>

            <div className='field'>
              <input
                type='number'
                defaultValue={0}
                min={0}
                id='prepTimeMinutes'
                name='prepTimeMinutes'
                ref={register({ required: 'Prep Time required' })}
                placeholder=' '
              />
              <label htmlFor='prepTimeMinutes'>Minutes</label>
            </div>
          </div>
          <button type='submit' className='btn-primary btn-large mb-2 submit'>
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};
