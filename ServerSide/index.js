import express from 'express';
import cors from 'cors';
import { port } from './env.js';
import userRoute from './Routes/userRoute.js';
import postRoute from './Routes/postRoute.js';

const app = new express();
app.use(
    cors({
        origin: 'https://iot-graduation-project-client.onrender.com',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        allowedHeaders: 'application/json',
    }),
);
app.use(express.json());
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send({ response: 'Invalid JSON format' });
    } else {
        next();
    }
});
app.listen(port, () => {
    console.log(`Running on: http://localhost:${port}`);
});
