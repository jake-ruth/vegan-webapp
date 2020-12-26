import { Typography } from '@material-ui/core';
import React from 'react';
import { Collection } from '../../models/Collection';

interface Props {
  collection: Collection;
}

export const CollectionCard = (props: Props) => {
  return (
    <div className='collection-card'>
      <div className='collection-card__img-container'>
        {/* <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} className='collection-card__img' />
        <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} className='collection-card__img' />
        <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} className='collection-card__img' />
        <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} className='collection-card__img' /> */}

        <div className='collection-card__img-placeholder' />
        <div className='collection-card__img-placeholder' />
        <div className='collection-card__img-placeholder' />
      </div>
      <div>3 recipes</div>
      <Typography className='collection-card__title' style={{ textAlign: 'center' }} variant='h5'>
        {props.collection.title}
      </Typography>
    </div>
  );
};
