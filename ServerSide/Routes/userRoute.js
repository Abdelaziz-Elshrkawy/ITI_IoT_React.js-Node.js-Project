import { Router } from 'express';
import UsersMethods from '../Database/models/userModel.js';
import ImageMethods from '../Database/models/ImageModel.js';
import imageProcessing from './helpers/imageProcessing.js';
import authorization, { createJWT } from './authorization.js';

const userRoute = new Router();
const users = new UsersMethods();
const userImage = new ImageMethods('users-image');

userRoute.post('/', imageProcessing('user-image'), async (req, res) => {
    const { name, age, email, password } = req.body;
    const { buffer, mimetype } = req.file;
    const checker = users.findUser(email)
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`body: ${JSON.stringify(req.body)}`);
    const userLoginStatus = await users.login(email, password);
    userLoginStatus;
    console.log(userLoginStatus);
    if (typeof userLoginStatus === 'object') {
        userLoginStatus.token = userLoginStatus.user
            ? createJWT(userLoginStatus.user._id, userLoginStatus.user.username)
            : null;
        res.json(userLoginStatus);
    } else {
        res.status(404).send(userLoginStatus);
    }
});

userRoute.get('/img/:id', authorization, async (req, res) => {
    const imageObject = await userImage.getImage(req.params.id);
    if (imageObject) {
        console.log(imageObject.contentType);
        res.send(
            `data:${imageObject.contentType};base64,${imageObject.data.toString(
                'base64',
            )}`,
        );
    } else {
        console.log(imageObject);
        res.status(404).send('not found');
    }
});

export default userRoute;
