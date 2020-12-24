import React from 'react';
import { Collection } from '../../models/Collection';

interface Props {
  collection: Collection;
}

export const CollectionCard = (props: Props) => {
  return <div>{props.collection.title}</div>;
};
