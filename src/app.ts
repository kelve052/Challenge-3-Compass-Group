import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './Routes/routes';
import connectDB from './database/db';
import swaggerDocument from '../swagger.json';

const app = express();
dotenv.config();

const port: number = 3000;

app.use(express.json());
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI!);
    // eslint-disable-next-line
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
};

start();
