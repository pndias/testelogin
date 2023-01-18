import dotenv from 'dotenv';
dotenv.config();

export default {
  serverPort: process.env.SERVER_PORT,
  tokenSecret: process.env.TOKEN_SECRET,
};
