import { Request, Response } from 'express';
import { createConnection, Connection } from 'typeorm';
import { ApplicationUser } from './entities/ApplicationUser';
import { ApplicationUserController } from './controllers/applicationUserController';
import { Recipe } from './entities/Recipe';
const express = require('express');

const app = express();

const makeApp = async () => {
  //Healthcheck to see server time up
  app.use('/_healthcheck', (req: Request, res: Response) => {
    return res.status(200).json({ uptime: process.uptime() });
  });

  app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));

  await createConnection();

  //Experiments
  // const applicationUser = new ApplicationUser();
  // applicationUser.testArray = ['Test1', 'Test2'];
  // applicationUser.firstName = 'Jake';
  // applicationUser.lastName = 'Ruth';

  // const user = await ApplicationUserController.createApplicationUser(applicationUser);

  const user = await ApplicationUser.findOne(1);

  // const recipe = new Recipe();
  // recipe.applicationUser = user!;
  // recipe.title = 'Vegan Mac and Cheese!';
  // recipe.description = 'Here is my mac and cheese desc';
  // recipe.ingredients = ['nooch', 'pasta', 'cashews'];
  // recipe.instructions = ['create mac', 'add cheese', 'serve and enjoy'];

  // Recipe.save(recipe);

  const recipeTest = await Recipe.find({ where: { applicationUser: user } });

  console.log('RECIPE: ', recipeTest);

  console.log(await ApplicationUserController.readAllApplicationUsers());
  //Experiments
};

makeApp();
