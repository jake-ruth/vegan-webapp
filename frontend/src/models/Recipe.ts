export interface Recipe {
  id?: number; //PK
  title: string;
  description: string;
  instructions: string;
  ingredients: string[];
  prepMinutes: number;
  cookMinutes: number;
}
