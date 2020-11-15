import React from 'react';
import { Navbar } from '../../components/Navbar';
import { RecipeCard } from '../../components/RecipeCard';
import { Footer } from '../../components/Footer';
import { RecipeController } from '../../controllers/RecipeController';
import { Recipe } from '../../models/Recipe';
import { Button, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

export const HomePage = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [recipesCount, setRecipesCount] = React.useState<number>(0);
  const [searchString, setSearchString] = React.useState<string>('');
  const [pageTrigger, setPageTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    RecipeController.pageRecipes(page).then((res: any) => {
      setRecipes(res.data.recipes);
      setRecipesCount(res.data.totalCount);
      setPageTrigger(!pageTrigger);
    });
  }, [page]);

  const searchForRecipes = () => {
    RecipeController.pageRecipesByName(page, searchString).then((res: any) => {
      setRecipes(res.data.recipes);
      setRecipesCount(res.data.totalCount);
      setPageTrigger(!pageTrigger);
    });
  };

  const handlePage = (e: any, pageNumber: number) => {
    console.log(pageNumber);
    setPage(pageNumber - 1);
  };

  return (
    <div className='home-page'>
      <Navbar />
      <div className='contain'>
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px' }}>
          <h2>New Recipes:</h2>
          <div>{recipesCount} recipes found</div>
          <TextField variant='outlined' label='Search for a recipe...' onChange={(e: any) => setSearchString(e.target.value)} />
          <Button onClick={() => searchForRecipes()}>Search!</Button>
        </div>
        <div className='recipe-card-container'>
          {recipes.map((recipe, index) => (
            <RecipeCard pageTrigger={pageTrigger} key={index} recipe={recipe} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1em' }}>
        <Pagination count={10} color='primary' shape='rounded' page={page + 1} onChange={handlePage} />
      </div>

      <Footer />
    </div>
  );
};
