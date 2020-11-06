import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { ApplicationUserController } from './controllers/applicationUserController';
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Express middlewares
app.use(cors());
app.use(require('./routes'));
app.use(bodyParser.json());

const makeApp = async () => {
  //Healthcheck to see server time up
  app.use('/_healthcheck', (req: Request, res: Response) => {
    return res.status(200).json({ uptime: process.uptime() });
  });

  await createConnection();

  ApplicationUserController.readOneApplicationUser(1);
};

makeApp();

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));
