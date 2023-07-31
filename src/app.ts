import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './Routes/routes';
import swaggerDocument from '../swagger.json';
import { start } from './server';

export const app = express();
dotenv.config();

app.use(express.json());
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

start();
