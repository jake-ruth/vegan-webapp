import protectedAxios from '../utils/axios';

export class CollectionRecipeController {
  static getCollectionRecipes = async (userId: number) => {
    try {
      let res = await protectedAxios.get(`${process.env.REACT_APP_BACKEND_URL}/getCollectionRecipes/${userId}`);
      return res.data;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };

  static getCollectionRecipesByCollection = async (collectionId: number) => {
    try {
      let res = await protectedAxios.get(`${process.env.REACT_APP_BACKEND_URL}/getCollectionRecipesByCollection/${collectionId}`);
      return res.data;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };

  static deleteCollectionRecipe = async (id: number) => {
    try {
      let res = await protectedAxios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteCollectionRecipe/${id}`);
      return res.data;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };
}
