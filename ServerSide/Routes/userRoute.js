import { Router } from 'express';
import UsersMethods from '../Database/models/userModel.js';
import ImageMethods from '../Database/models/ImageModel.js';
import imageProcessing from './helpers/imageProcessing.js';
import { createJWT } from './authorization.js';

const userRoute = new Router();
const users = new UsersMethods('Users');
const userImage = new ImageMethods('users-image');

userRoute.post('/', async (req, res) => {
    try {
        const { name, email, password, profilePicture } = req.body;
        const checker = await users.findUser(email);
        if (checker === null) {
            const image = await userImage.addImage(profilePicture);
            const user = await users.addUser(name, email, password, image._id);
            if (user) {
                res.json({ response: 'Success' });
            } else {
                throw new Error('something went wrong');
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
    if (typeof userLoginStatus === 'object') {
        userLoginStatus.token = userLoginStatus.user
            ? createJWT(userLoginStatus.user._id, userLoginStatus.user.username)
            : null;
        userLoginStatus.image = null;
        if (userLoginStatus.logged) {
            const { data } = await userImage.getImage(
                userLoginStatus.user.imageId,
            );
            userLoginStatus.image =
                data && userLoginStatus.logged ? data : null;
        }
        console.log(userLoginStatus)
        res.json(userLoginStatus);
        console.log(userLoginStatus);
    } else {
        res.status(404).send(userLoginStatus);
    }
});

userRoute.put('/:userid', async (req, res) => {
    const { userid } = req.params;
    const { name, password } = req.body;
    const user = await users.updateUser(userid, name, password);
    res.json({ user });
});

export default userRoute;
