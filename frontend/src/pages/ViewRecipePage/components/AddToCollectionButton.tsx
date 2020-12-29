import React from 'react';
import { RecipeContext, UserContext } from '../../../context';
import { Backdrop, Button, Checkbox, Fade, FormControlLabel, makeStyles, Modal, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Collection } from '../../../models/Collection';
import { CollectionController } from '../../../controllers/CollectionController';
import { CollectionRecipeController } from '../../../controllers/CollectionRecipeController';
import { CollectionRecipe } from '../../../models/CollectionRecipe';
import { CreateNewCollectionForm } from './CreateNewCollectionForm';

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
  const [createNewCollection, setCreateNewCollection] = React.useState<boolean>(false);
  const [collections, setCollections] = React.useState<Collection[]>();
  const [collectionRecipes, setCollectionRecipes] = React.useState<CollectionRecipe[]>();

  React.useEffect(() => {
    CollectionController.getCollections(user.id!).then((collections) => setCollections(collections));
    CollectionRecipeController.getCollectionRecipes(user.id!).then((collectionRecipes) =>
      setCollectionRecipes(collectionRecipes)
    );
  }, [showCollections]);

  const addRecipeToCollection = async (collectionId: number) => {
    let filtered = collectionRecipes?.filter((collectionRecipe) => {
      return collectionRecipe.recipe.id === recipe!.id && collectionRecipe.collection.id === collectionId;
    });

    if (filtered) {
      if (filtered.length) {
        await CollectionRecipeController.deleteCollectionRecipe(filtered[0].id);
        setShowCollections(false);
        setShowCollections(true);
      } else {
        await CollectionController.addRecipeToCollection(recipe?.id!, collectionId, user.id!);
        setShowCollections(false);
        setShowCollections(true);
      }
    }
  };

  const checkIfRecipeInCollection = (collection: Collection) => {
    let filtered = collectionRecipes?.filter((collectionRecipe) => {
      return collectionRecipe.recipe.id === recipe!.id && collectionRecipe.collection.id === collection.id;
    });
    if (filtered) {
      if (filtered.length) return true;
    }
    return false;
  };

  return (
    <div>
      <Button
        onClick={() => setShowCollections(true)}
        endIcon={<AddIcon />}
        color='primary'
        variant='contained'
        style={{ borderRadius: 0, marginRight: '1em' }}>
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
        BackdropProps={{ timeout: 500 }}>
        <Fade in={showCollections}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Add Recipe to Collection</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {collections?.map((collection) => {
                return (
                  <FormControlLabel
                    onClick={() => addRecipeToCollection(collection.id!)}
                    value='top'
                    control={<Checkbox color='primary' checked={checkIfRecipeInCollection(collection)} />}
                    label={collection.title}
                    labelPlacement='end'
                  />
                );
              })}
            </div>
            <Divider />

            {createNewCollection ? (
              <CreateNewCollectionForm />
            ) : (
              <Button
                onClick={() => setCreateNewCollection(true)}
                style={{ marginTop: '1em', borderRadius: 0 }}
                variant='contained'
                startIcon={<AddIcon />}>
                New Collection
              </Button>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
