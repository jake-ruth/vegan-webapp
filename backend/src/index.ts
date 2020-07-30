import { Request, Response } from 'express';
import { createConnection, Connection } from 'typeorm';
import { ApplicationUser } from './entities/ApplicationUser';
import { ApplicationUserController } from './controllers/applicationUserController';
const express = require('express');

const app = express();

const makeApp = async () => {
  //Healthcheck to see server time up
  app.use('/_healthcheck', (req: Request, res: Response) => {
    return res.status(200).json({ uptime: process.uptime() });
  });

  app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));

  await createConnection();

  const applicationUser = new ApplicationUser();
  applicationUser.testArray = ['Test1', 'Test2'];
  applicationUser.firstName = 'Erika';

  ApplicationUserController.createApplicationUser(applicationUser);

  console.log(await ApplicationUserController.readAllApplicationUsers());
};

makeApp();
