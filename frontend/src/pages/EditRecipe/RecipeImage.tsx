import React from 'react';
import firebase from 'firebase';

export const RecipeImage = () => {
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rootRef = firebase.storage().ref();
    let fileRef = rootRef.child(e.target.files![0].name);
    let file = e.target.files![0];
    fileRef.put(file).then((res) => console.log(res));
  };
  return (
    <form onChange={(e: any) => uploadImage(e)}>
      <img src='' alt='recipe image' className='profile-page__img file-uploader' />
      <input className='file-uploader' type='file' accept='.jpg,.jpeg,.png' />
    </form>
  );
};
