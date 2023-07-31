// import mongoose from "mongoose";

// const connectDB = (url: string) => {
//   return mongoose.connect(url);
// };

// export default connectDB;
import mongoose from 'mongoose';

let database: mongoose.Connection | null = null;

export const connectDB = (url: string) => {
  if (database) {
    return database;
  }

  return mongoose.connect(url, {}).then((conn) => {
    database = conn.connection;
    return database;
  });
};

export const closeDB = async () => {
  if (database) {
    await database.close();
    console.log('Database connection closed');
    database = null;
  }
};
