import React from 'react';
import { Navbar } from '../../components/Navbar';
import { RecipeCard } from '../../components/RecipeCard';
import { Footer } from '../../components/Footer';
import { RecipeController } from '../../controllers/RecipeController';
import { Recipe } from '../../models/Recipe';
import Pagination from '@material-ui/lab/Pagination';
import SearchBar from 'material-ui-search-bar';

export const HomePage = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [recipesCount, setRecipesCount] = React.useState<number>(0);
  const [searchString, setSearchString] = React.useState<string>('');
  const [pageTrigger, setPageTrigger] = React.useState<boolean>(false);

  React.useEffect(() => pageAllRecipes(), [page]);

  const pageAllRecipes = () => {
    RecipeController.pageRecipes(page).then((res: any) => {
      setRecipes(res.data.recipes);
      setRecipesCount(res.data.totalCount);
      setPageTrigger(!pageTrigger);
    });
  };

  const searchForRecipes = () => {
    if (searchString.length > 0) {
      RecipeController.pageRecipesByName(page, searchString).then((res: any) => {
        setRecipes(res.data.recipes);
        setRecipesCount(res.data.totalCount);
        setPageTrigger(!pageTrigger);
      });
    }
  };

  const handlePage = (e: any, pageNumber: number) => setPage(pageNumber - 1);

  return (
    <div className='home-page'>
      <Navbar />

      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
        <div className='home-page__search-bar'>
          <SearchBar
            style={{ borderRadius: 3 }}
            value={searchString}
            onChange={(newValue) => setSearchString(newValue)}
            onRequestSearch={() => searchForRecipes()}
            onCancelSearch={() => {
              setSearchString('');
              pageAllRecipes();
            }}
            placeholder='Search for a recipe...'
          />
        </div>
      </div>

      <div className='recipe-card-container'>
        {recipes.map((recipe, index) => (
          <RecipeCard pageTrigger={pageTrigger} key={index} recipe={recipe} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '1em' }}>
        <Pagination count={Math.ceil(recipesCount / 8)} color='primary' shape='rounded' page={page + 1} onChange={handlePage} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1em' }}>
        <div>
          {recipesCount} total {recipesCount === 1 ? 'recipe' : 'recipes'}
        </div>
      </div>

      <Footer />
    </div>
  );
};
