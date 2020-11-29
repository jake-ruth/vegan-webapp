import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/Register';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ViewRecipePage } from '../pages/ViewRecipePage';
import { CreateRecipe } from '../pages/CreateRecipe';
import { AccountPage } from '../pages/AccountPage';
import { PrivateRoute } from './ProtectedRoute';
import { EditRecipe } from '../pages/EditRecipe';

export const BaseRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/loginPage' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/viewRecipe/:recipeId' component={ViewRecipePage} />
        <Route path='/account' component={AccountPage} />

        <PrivateRoute path='/createRecipe' component={CreateRecipe} />
        <PrivateRoute path='/editRecipe/:recipeId' component={EditRecipe} />
      </Switch>
    </Router>
  );
};
