import { Router } from 'express';
import UsersMethods from '../Database/models/userModel.js';
import userImage from './imageProcessing.js';
const userRoute = new Router();
const users = new UsersMethods();

userRoute.post('/', userImage.single('user-image'), async (req, res) => {
    const { name, age, email, username, password } = req.body;
    const image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
    };
    console.log('handle' + image);
    res.json(await users.addUser(name, age, email, username, password, image));
});

userRoute.get('/login', async (req, res) => {
    const { email, password } = req.body;
    res.json(await users.login(email, password));
});

export default userRoute;
