import { Router } from 'express';
import UsersMethods from '../Database/models/userModel.js';
import ImageMethods from '../Database/models/ImageModel.js';
import jsonwebtoken from 'jsonwebtoken';
import { jwt_secret } from '../env.js';
import imageProcessing from './helpers/imageProcessing.js';

const userRoute = new Router();
const users = new UsersMethods();
const userImage = new ImageMethods('user-images', users.modelName);

userRoute.post('/', imageProcessing('user-image'), async (req, res) => {
    const { name, age, email, username, password } = req.body;
    const userResponse = await users.addUser(
        name,
        age,
        email,
        username,
        password,
    );
    const responseStatus = () =>
        typeof userResponse === 'object' ? 'Success' : userResponse;
    if (responseStatus() === 'Success' && req.file) {
        const imageResponse = await userImage.addImage(
            userResponse._id,
            req.file.buffer,
            req.file.mimetype,
        );
        console.log(imageResponse);
    }
    res.status(responseStatus() === 'Success' ? 201 : 208).json({
        response: responseStatus(),
    });
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userLoginStatus = await users.login(email, password);
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

userRoute.get('/img/:id', async (req, res) => {
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

const createJWT = (userId, username) => {
    return jsonwebtoken.sign({ userId, username }, jwt_secret, {
        expiresIn: '7d',
    });
};

export default userRoute;
