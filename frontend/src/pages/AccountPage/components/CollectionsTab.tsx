import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { CollectionCard } from '../../../components/CollectionCard';
import { UserContext } from '../../../context';
import { CollectionController } from '../../../controllers/CollectionController';
import { Collection } from '../../../models/Collection';
import { Recipe } from '../../../models/Recipe';
import { AddCollectionModal } from './AddCollectionModal';

export const CollectionsTab = () => {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showAddCollection, setShowAddCollection] = React.useState<boolean>(false);
  const [collections, setCollections] = React.useState<Collection[]>();

  React.useEffect(() => {
    CollectionController.getCollections(user.id!)
      .then((collections) => setCollections(collections))
      .then(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', marginTop: 30 }}>
        <Typography variant='h3'>My Collections</Typography>
        <Button
          style={{ borderRadius: 0 }}
          variant='contained'
          color='primary'
          title='Add Collection'
          onClick={() => setShowAddCollection(true)}>
          Add Collection
        </Button>
      </div>

      {collections?.map((collection) => {
        return <CollectionCard collection={collection} />;
      })}

      <AddCollectionModal setShow={setShowAddCollection} show={showAddCollection} />
    </div>
  );
};
