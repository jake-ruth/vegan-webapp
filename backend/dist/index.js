"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
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
const makeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    //Healthcheck to see server time up
    app.use('/_healthcheck', (req, res) => {
        return res.status(200).json({ uptime: process.uptime() });
    });
    //Serve react app
    app.use(express.static(path.join(__dirname, '../../frontend/build/')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
    });
    yield typeorm_1.createConnection({
        type: 'postgres',
        host: process.env.TYPEORM_DB_HOST,
        port: Number(process.env.TYPEORM_DB_PORT),
        username: process.env.TYPEORM_DB_USERNAME,
        password: process.env.TYPEORM_DB_PASSWORD,
        database: process.env.TYPEORM_DB_NAME,
        synchronize: true,
        logging: true,
        entities: [__dirname + '/entities/**/*.ts'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
        ssl: process.env.NODE_ENV === 'development' ? false : true,
        extra: process.env.NODE_ENV === 'development'
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
});
makeApp();
console.log('ENVIRONMENT: ', process.env.NODE_ENV);
console.log('CONNECTED TO DB: ', process.env.TYPEORM_DB_NAME);
app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));
//# sourceMappingURL=index.js.map