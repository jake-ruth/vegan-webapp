import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { CollectionController } from '../../../controllers/CollectionController';
import { UserContext } from '../../../context';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const AddCollectionModal = (props: Props) => {
  const classes = useStyles();
  const methods = useForm();
  const { user } = React.useContext(UserContext);

  const onSubmit = async (data: any) => {
    console.log('here');
    await CollectionController.createCollection(data.title, Number(user!.id)).then(() => {
      props.setShow(false);
    });
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={props.show}
      onClose={() => props.setShow(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={props.show}>
        <div className={classes.paper}>
          <h2 id='transition-modal-title'>New Collection</h2>
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' color='secondary' style={{ borderRadius: 0 }} onClick={() => props.setShow(false)}>
                Cancel
              </Button>
              <Button type='submit' color='primary' variant='contained' style={{ borderRadius: 0 }}>
                Create
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};
