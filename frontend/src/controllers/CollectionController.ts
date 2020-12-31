import protectedAxios from '../utils/axios';

export class CollectionController {
  static createCollection = async (title: string, userId: number) => {
    try {
      let res = await protectedAxios.post(`${process.env.REACT_APP_BACKEND_URL}/createCollection/`, { title, userId });
      return res;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };

  static getCollections = async (userId: number) => {
    try {
      let res = await protectedAxios.get(`${process.env.REACT_APP_BACKEND_URL}/getCollections/${userId}`);
      return res.data;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };

  static addRecipeToCollection = async (recipeId: number, collectionId: number, userId: number) => {
    try {
      let res = await protectedAxios.post(`${process.env.REACT_APP_BACKEND_URL}/addRecipeTocollection/`, {
        recipeId,
        collectionId,
        userId
      });
      return res.data;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };

  static deleteCollection = async (id: number) => {
    try {
      let res = await protectedAxios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteCollection/${id}`);
      return res;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };
}
