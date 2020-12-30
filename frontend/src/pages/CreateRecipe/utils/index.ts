export interface RecipeFields {
  title: string;
  description: string;
  instructions: string;
  ingredients: string;
  prepHours: number;
  prepMinutes: number;
  cookHours: number;
  cookMinutes: number;
  yieldAmount: string;
}

export const defaultRecipe: RecipeFields = {
  title: '',
  description: '',
  instructions: '',
  ingredients: '',
  prepHours: 0,
  prepMinutes: 0,
  cookHours: 0,
  cookMinutes: 0,
  yieldAmount: ''
};
