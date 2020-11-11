import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv-flow').config();

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

  //Serve react app
  app.use(express.static(path.join(__dirname, '../../frontend/build/')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
  });

  await createConnection({
    type: 'postgres',
    host: process.env.TYPEORM_DB_HOST,
    port: Number(process.env.TYPEORM_DB_PORT),
    username: process.env.TYPEORM_DB_USERNAME,
    password: process.env.TYPEORM_DB_PASSWORD,
    database: process.env.TYPEORM_DB_NAME,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entities/**{.ts,.js}'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    ssl: process.env.NODE_ENV === 'development' ? false : true,
    extra:
      process.env.NODE_ENV === 'development'
        ? {}
        : {
            ssl: {
              rejectUnauthorized: false
            }
          },
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  });
};

makeApp();

console.log('ENVIRONMENT: ', process.env.NODE_ENV);
console.log('CONNECTED TO DB: ', process.env.TYPEORM_DB_NAME);

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));
