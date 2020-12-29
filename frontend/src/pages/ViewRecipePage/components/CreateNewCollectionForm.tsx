import { TextField, Button } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RecipeContext, UserContext } from '../../../context';
import { CollectionController } from '../../../controllers/CollectionController';
import { CollectionRecipeController } from '../../../controllers/CollectionRecipeController';

export const CreateNewCollectionForm = () => {
  const { user } = React.useContext(UserContext);
  const { recipe } = React.useContext(RecipeContext);
  const methods = useForm();

  const onSubmit = async (data: any) => {
    try {
      let res = await CollectionController.createCollection(data.title, user.id!);
      const newCollectionId = res?.data.id;

      //Add this recipe to the collection
      await CollectionController.addRecipeToCollection(recipe!.id!, newCollectionId, user.id!);
      console.log('RES: ', res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Controller
        as={TextField}
        control={methods.control}
        rules={{ required: 'Title Required' }}
        type='text'
        id='title'
        name='title'
        label='Title'
        fullWidth
        defaultValue=''
        style={{ marginBottom: 20 }}
      />
      <div className='error'>{methods.errors.title && methods.errors.title.message}</div>

      <Button type='submit'>Create</Button>
    </form>
  );
};
