import firebase from 'firebase';

export class FirebaseController {
  static getImageUrl = (imageUrlUuid: string, imageExtension: string) => {
    var storage = firebase.storage();
    const gsRef = storage.refFromURL(`gs://vegan-webapp.appspot.com/${imageUrlUuid}.${imageExtension}`);
    return gsRef.getDownloadURL();
  };

  static uploadRecipeImage = (imageUuid: string, recipeImageFile: File) => {
    const fileExtension = recipeImageFile!.name.split('.').pop();

    let rootRef = firebase.storage().ref();
    let fileRef = rootRef.child(`${imageUuid}.${fileExtension}`);

    fileRef.put(recipeImageFile!).then((res) => console.log(res));
  };
}
