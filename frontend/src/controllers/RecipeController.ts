import axios from 'axios';
import { Recipe } from '../models/Recipe';

export class RecipeController {
  static pageRecipes = async (pageNumber: number) => {
    try {
      console.log(process.env.REACT_APP_BACKEND_URL);
      let recipes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pageRecipes/${pageNumber}`);
      return recipes;
    } catch (err) {
      console.log('ERROR: ', err);
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

  static createRecipe = async (recipe: Recipe) => {
    try {
      return axios.post(`${process.env.REACT_APP_BACKEND_URL}/createRecipe`, recipe);
    } catch (err) {
      console.log(err);
    }
  };
}
