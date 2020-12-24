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
  ingredients: string;
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
    let newRecipe: any = props.recipe;
    return newRecipe;
  };

  const formatLinesToArray = (string: string) => {
    let initialArray: string[] = string.split(/\n/);
    let linesArray: string[] = [];

    initialArray.map((item: string) => {
      //check if only whitespace
      if (!item.replace(/\s/g, '').length) return;
      return linesArray.push(item);
    });
    return linesArray;
  };

  const methods = useForm<IFormInput>({ defaultValues: formatRecipe() });

  React.useEffect(() => {
    let ingredients: any = methods.getValues('ingredients');
    let instructions: any = methods.getValues('instructions');
    let formatted = '';
    let formattedInstructions = '';

    ingredients.map((ingredient: any) => {
      return (formatted = formatted + ingredient + '\n\n');
    });

    instructions.map((instruction: any) => {
      return (formattedInstructions = formattedInstructions + instruction + '\n\n');
    });

    methods.setValue('ingredients', formatted);
    methods.setValue('instructions', formattedInstructions);
  }, []);

  const onSubmit = async (data: IFormInput) => {
    let recipe: Recipe = {
      id: Number(data.id), //needs this
      title: data.title,
      description: data.description,
      cookMinutes: Number(data.cookMinutes) + data.cookHours * 60,
      prepMinutes: Number(data.prepMinutes) + data.prepHours * 60,
      ingredients: formatLinesToArray(data.ingredients),
      instructions: formatLinesToArray(data.instructions),
      yieldAmount: data.yieldAmount,
      imageExtension: props.recipe.imageExtension // Will change
    };

    try {
      // const res = await RecipeController.createRecipe(recipe);
      await RecipeController.createRecipe(recipe, user.uuid);
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
