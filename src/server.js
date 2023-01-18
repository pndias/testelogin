import express from 'express';
import router from './routes/index.js';
import config from '../config/index.js';
import database from '../config/database.js';

const server = express();

server.use(express.json());
server.use(router);
server.listen(config.serverPort, () => {
  console.log('Server is running!');
});

