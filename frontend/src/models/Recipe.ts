export interface Recipe {
  id?: number; //PK
  title: string;
  description: string;
  instructions: string;
  ingredients: string[];
  prepMinutes: number;
  cookMinutes: number;
  yieldAmount: string;
  createdDate?: Date;
  imageExtension?: string;
  imageUrlUuid?: string;
  applicationUser?: any;
}
