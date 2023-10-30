import { Router } from 'express';
import UsersMethods from '../Database/models/userModel.js';
import ImageMethods from '../Database/models/ImageModel.js';
import imageProcessing from './helpers/imageProcessing.js';
import { createJWT } from './authorization.js';

const userRoute = new Router();
const users = new UsersMethods('Users');
const userImage = new ImageMethods('users-image');

userRoute.post('/', imageProcessing('user-image'), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { buffer, mimetype } = req.file;
        const checker = await users.findUser(email);
        if (checker === null) {
            const image = await userImage.addImage(buffer, mimetype);
            const user = await users.addUser(name, email, password, image._id);
            if (user) {
                res.json({ response: 'Success' });
            } else {
                throw new Error('some thing wrong happened');
            }
        } else {
            res.json({ response: 'user exist' });
        }
    } catch (err) {
        res.json({ response: err.message });
    }
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userLoginStatus = await users.login(email, password);
    userLoginStatus;
    if (typeof userLoginStatus === 'object') {
        userLoginStatus.token = userLoginStatus.user
            ? createJWT(userLoginStatus.user._id, userLoginStatus.user.username)
            : null;
        const { contentType, data } = await userImage.getImage(
            userLoginStatus.user.imageId,
        );
        userLoginStatus.image =
            contentType && userLoginStatus.logged
                ? `data:${contentType};base64,${data.toString('base64')}`
                : null;

        res.json(userLoginStatus);
    } else {
        res.status(404).send(userLoginStatus);
    }
});

export default userRoute;
