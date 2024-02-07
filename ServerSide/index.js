import express from 'express';
import cors from 'cors';
import { port } from './env.js';
import userRoute from './Routes/userRoute.js';
import postRoute from './Routes/postRoute.js';
import bodyParser from 'body-parser';

const app = new express();
app.use(cors());
app.use(express.json());


app.use('/post', postRoute);
app.use('/user', userRoute);
app.listen(port, () => {
  console.log(`Running on: http://localhost:${port}`);
});