import firebase from 'firebase';

export class FirebaseController {
  static getImageUrl = (imageUrlUuid: string, imageExtension: string) => {
    var storage = firebase.storage();
    const gsRef = storage.refFromURL(`gs://vegan-webapp.appspot.com/${imageUrlUuid}.${imageExtension}`);
    return gsRef.getDownloadURL();
  };
}
