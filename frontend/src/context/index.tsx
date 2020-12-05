import React from 'react';
import { ApplicationUser } from '../models/ApplicationUser';
import { Recipe } from '../models/Recipe';
import { AuthService } from '../utils/AuthService';

type UserContextProps = {
  user: ApplicationUser;
  setUser: any;
};

export const UserContext = React.createContext<UserContextProps>({
  user: AuthService.getUserFromStorage(),
  setUser: null
});

type RecipeContextProps = {
  recipe: Recipe | null;
  setRecipe: any;
};

export const RecipeContext = React.createContext<RecipeContextProps>({
  recipe: null,
  setRecipe: null
});
