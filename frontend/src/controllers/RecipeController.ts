import axios from 'axios';
import protectedAxios from '../utils/axios';
import { Recipe } from '../models/Recipe';

export class RecipeController {
  static pageRecipes = async (pageNumber: number) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pageRecipes/${pageNumber}`);
      return res;
    } catch (err) {
      console.log('ERROR: ', err);
    }
  };

  static pageRecipesByName = async (pageNumber: number, searchString: string) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pageRecipesByName/${pageNumber}/${searchString}`);
      return res;
    } catch (err) {
      console.log('ERR: ', err);
    }
  };

  static getRecipeById = async (id: number) => {
    try {
      let recipe = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getRecipeById/${id}`);

      return recipe;
    } catch (err) {
      console.log(err);
    }
  };

  static getRecipesForUser = async (userUuid: string) => {
    try {
      let recipe = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getRecipesForUser/${userUuid}`);

      return recipe.data;
    } catch (err) {
      console.log(err);
    }
  };

  static createRecipe = async (recipe: Recipe, userUuid: string) => {
    try {
      return protectedAxios.post(`${process.env.REACT_APP_BACKEND_URL}/createRecipe`, { recipe, userUuid });
    } catch (err) {
      console.log(err);
    }
  };
}
