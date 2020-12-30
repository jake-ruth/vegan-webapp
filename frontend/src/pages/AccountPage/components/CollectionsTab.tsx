import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { CollectionCard } from '../../../components/CollectionCard';
import { UserContext } from '../../../context';
import { CollectionController } from '../../../controllers/CollectionController';
import { Collection } from '../../../models/Collection';
import { AddCollectionModal } from './AddCollectionModal';
import AddIcon from '@material-ui/icons/Add';

export const CollectionsTab = () => {
  const { user } = React.useContext(UserContext);
  const [showAddCollection, setShowAddCollection] = React.useState<boolean>(false);
  const [collections, setCollections] = React.useState<Collection[]>();

  React.useEffect(() => {
    CollectionController.getCollections(user.id!).then((collections) => setCollections(collections));
  }, []);

  return (
    <div>
      <Typography variant='h4'>My Collections</Typography>
      <div className='collections-container'>
        {collections?.map((collection) => {
          return <CollectionCard collection={collection} />;
        })}
        <div className='add-collection-card'>
          <Button
            size='large'
            fullWidth
            style={{ borderRadius: 0, backgroundColor: 'white' }}
            variant='contained'
            color='default'
            title='Add Collection'
            onClick={() => setShowAddCollection(true)}
            endIcon={<AddIcon />}>
            Add Collection
          </Button>
        </div>
      </div>

      <AddCollectionModal setShow={setShowAddCollection} show={showAddCollection} />
    </div>
  );
};
