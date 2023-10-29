import express from 'express';
import cors from 'cors';
import { port } from './env.js';
import userRoute from './Routes/userRoute.js';

const app = new express();

app.use(express.json());
app.use(cors());
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Running on: http://localhost:${port}`);
});
