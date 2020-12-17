import React from 'react';
import { ApplicationUser } from '../models/ApplicationUser';
import { Recipe } from '../models/Recipe';
import { AuthService } from '../utils/AuthService';

type UserContextProps = {
  user: ApplicationUser;
  setUser: any;
};

type RecipeContextProps = {
  recipe: Recipe | undefined;
  setRecipe: any;
};

export const UserContext = React.createContext<UserContextProps>({
  user: AuthService.getUserFromStorage(),
  setUser: null
});

export const RecipeContext = React.createContext<RecipeContextProps>({
  recipe: undefined,
  setRecipe: null
});
