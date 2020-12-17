import axios from 'axios';
import protectedAxios from '../utils/axios';

export class FavoriteController {
  static addRecipeToFavorites = async (recipeId: number, userId: number) => {
    try {
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addRecipeToFavorites/`, { recipeId, userId });
      return res;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };

  static getFavoriteRecipes = async (userId: number) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getFavoriteRecipes/${userId}`);
      return res;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };

  static deleteFavoriteRecipe = async (id: number) => {
    try {
      let res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteFavoriteRecipe/${id}`);
      return res;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };
}
