import React from 'react';
import { RecipeContext, UserContext } from '../../../context';
import { Button, Snackbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { FavoriteController } from '../../../controllers/FavoriteController';
import { Alert } from '@material-ui/lab';

export const AddToCollectionButton = () => {
  return (
    <Button endIcon={<AddIcon />} color='primary' variant='contained' style={{ borderRadius: 0, marginLeft: '1em' }}>
      Add to Collection
    </Button>
  );
};
