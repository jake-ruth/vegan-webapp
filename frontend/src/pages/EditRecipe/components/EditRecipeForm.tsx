import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Snackbar } from '@material-ui/core';
import { EditRecipeContent } from './EditRecipeContent';
import { CropTest } from './CropTest';
import { RecipeController } from '../../../controllers/RecipeController';
import { Recipe } from '../../../models/Recipe';
import { UserContext } from '../../../context';
import { Alert } from '@material-ui/lab';

interface IFormInput {
  id: number;
  title: string;
  description: string;
  instructions: string;
  ingredients: any[];
  prepHours: number;
  prepMinutes: number;
  cookHours: number;
  cookMinutes: number;
  yieldAmount: string;
}

interface Props {
  recipe: Recipe;
}

export const EditRecipeForm = (props: Props) => {
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);
  const { user } = React.useContext(UserContext);

  const formatRecipe = () => {
    let recipe: any = props.recipe;
    let formattedIngredients: any[] = [];
    props.recipe.ingredients.map((ingredient: any) => {
      console.log('ingredient: ', ingredient);
      formattedIngredients.push({ value: ingredient });
    });

    recipe.ingredients = formattedIngredients;
    return recipe;
  };

  const methods = useForm<IFormInput>({ defaultValues: formatRecipe() });
  const onSubmit = async (data: IFormInput, e: any) => {
    const formatIngredients = () => {
      let ingredientsArray: string[] = [];
      data.ingredients.map((ingredient: any) => {
        ingredientsArray.push(ingredient.value);
      });

      // alert(JSON.stringify(ingredientsArray));
      return ingredientsArray;
    };

    let recipe: Recipe = {
      id: Number(data.id), //needs this
      title: data.title,
      description: data.description,
      cookMinutes: Number(data.cookMinutes) + data.cookHours * 60,
      prepMinutes: Number(data.prepMinutes) + data.prepHours * 60,
      ingredients: formatIngredients(),
      instructions: data.instructions,
      yieldAmount: data.yieldAmount,
      imageExtension: props.recipe.imageExtension // Will change
    };

    try {
      // const res = await RecipeController.createRecipe(recipe);
      const res = await RecipeController.createRecipe(recipe, user.uuid);
      setShowSnackbar(true);
      // uploadImage(res!.data.imageUrlUuid);
      //   history.push('/');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Edit Recipe</h1>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='create-recipe'>
          <FormProvider {...methods}>
            <input name='id' ref={methods.register} hidden />
            <EditRecipeContent />
            <br />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ borderRadius: 0, maxWidth: 200, marginTop: '1em' }}>
              Save Recipe!
            </Button>

            <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={() => setShowSnackbar(false)}>
              <Alert onClose={() => setShowSnackbar(false)} severity='info'>
                Recipe Saved!
              </Alert>
            </Snackbar>
          </FormProvider>
        </div>
      </form>
    </div>
  );
};
