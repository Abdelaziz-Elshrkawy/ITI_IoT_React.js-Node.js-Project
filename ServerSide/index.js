import express from 'express';
import cors from 'cors';
import { port } from './env.js';
import userRoute from './Routes/userRoute.js';
import postRoute from './Routes/postRoute.js';

const app = new express();

app.use(express.json());
app.use(
    cors({
        origin: 'https://iot-graduation-project-client.onrender.com',
    }),
);
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
