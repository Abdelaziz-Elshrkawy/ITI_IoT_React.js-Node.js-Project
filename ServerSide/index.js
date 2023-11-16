import express from 'express';
import cors from 'cors';
import { port } from './env.js';
import userRoute from './Routes/userRoute.js';
import postRoute from './Routes/postRoute.js';
import bodyParser from 'body-parser';

const app = new express();
app.use(
  cors()
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send({ response: 'Invalid JSON format' });
  } else {
    next();
  }
});
app.use('/user', userRoute);
app.use('/post', postRoute);
app.listen(port, () => {
  console.log(`Running on: http://localhost:${port}`);
});


