import { app } from './app';
import { connectDB, closeDB } from './database/db';

let server: any;

export const start = async (port: number = 3000) => {
  try {
    await connectDB(process.env.MONGO_URI!);
    server = app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

export const close = async () => {
  if (server) {
    closeDB;
    server.close();
    console.log('Server closed');
  }
};
