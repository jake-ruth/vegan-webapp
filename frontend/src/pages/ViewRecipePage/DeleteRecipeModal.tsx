import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { RecipeContext } from '../../context';
import { Button } from '@material-ui/core';
import { RecipeController } from '../../controllers/RecipeController';
import { useHistory } from 'react-router-dom';

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

export const DeleteRecipeModal = (props: Props) => {
  const { recipe } = React.useContext(RecipeContext);
  const classes = useStyles();
  const history = useHistory();

  const deleteRecipe = async () => {
    let res = await RecipeController.deleteRecipe(Number(recipe!.id));
    history.push('/');
  };

  return (
    <div>
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
            <h2 id='transition-modal-title'>Delete Recipe?</h2>
            <p id='transition-modal-description'>Are you sure you want to delete your recipe?</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' color='secondary' style={{ borderRadius: 0 }} onClick={() => props.setShow(false)}>
                No
              </Button>
              <Button onClick={() => deleteRecipe()} color='primary' variant='contained' style={{ borderRadius: 0 }}>
                Yes
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
