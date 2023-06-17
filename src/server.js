import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';

config({
  path: path.join(__dirname, '../.env.' + process.env.NODE_ENV)
})

import './storage/db-connection'
import router from './api/routes'
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'));

app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log('NODE_ENV', process.env.NODE_ENV);
  console.log('Server listening on port', process.env.PORT);
});
