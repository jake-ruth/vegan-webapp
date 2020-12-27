import React from 'react';
import { RecipeContext, UserContext } from '../../../context';
import { Backdrop, Button, Checkbox, Fade, FormControlLabel, List, ListItem, makeStyles, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Collection } from '../../../models/Collection';
import { CollectionController } from '../../../controllers/CollectionController';

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

export const AddToCollectionButton = () => {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);
  const { recipe } = React.useContext(RecipeContext);
  const [showCollections, setShowCollections] = React.useState<boolean>(false);
  const [collections, setCollections] = React.useState<Collection[]>();

  React.useEffect(() => {
    CollectionController.getCollections(user.id!).then((collections) => setCollections(collections));
  }, [showCollections]);

  const addRecipeToCollection = async (collectionId: number) => {
    await CollectionController.addRecipeToCollection(recipe?.id!, collectionId);
  };

  return (
    <div>
      <Button
        onClick={() => setShowCollections(true)}
        endIcon={<AddIcon />}
        color='primary'
        variant='contained'
        style={{ borderRadius: 0, marginLeft: '1em' }}>
        Add to Collection
      </Button>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={showCollections}
        onClose={() => setShowCollections(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={showCollections}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Add Recipe to Collection</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {collections?.map((collection) => {
                return (
                  <FormControlLabel
                    onClick={() => addRecipeToCollection(collection.id!)}
                    value='top'
                    control={<Checkbox color='primary' />}
                    label={collection.title}
                    labelPlacement='end'
                  />
                );
              })}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
