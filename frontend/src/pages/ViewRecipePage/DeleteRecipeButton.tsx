import { Button } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteRecipeModal } from './DeleteRecipeModal';

export const DeleteRecipeButton = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <div>
      <Button
        endIcon={<DeleteIcon />}
        onClick={() => setShowModal(true)}
        color='secondary'
        variant='contained'
        style={{ borderRadius: 0, float: 'right', margin: 10 }}>
        Delete Recipe
      </Button>
      <DeleteRecipeModal show={showModal} setShow={setShowModal} />
    </div>
  );
};
