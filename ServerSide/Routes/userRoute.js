import { Router } from 'express';
import UsersMethods from '../Database/models/userModel.js';
import ImageMethods from '../Database/models/ImageModel.js';
import authorization, { createJWT } from './authorization.js';

const userRoute = new Router();
const users = new UsersMethods('Users');
const userImage = new ImageMethods('users-image');

userRoute.post('/', async (req, res) => {

    try {
        console.log(req.body);
        const { name, email, password, profilePicture } = req.body;
        const checker = await users.findUser(email);
        if (checker === null) {
            const image = await userImage.addImage(profilePicture);
            const user = await users.addUser(name, email, password, image._id);
            if (user) {
                res.json({ response: 'Success' });
            } else {
                res.json({ response: 'something went wrong' });
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
    console.log(req.body);
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
            res.json(userLoginStatus);
        } else {
            res.json({ userLoginStatus });
        }
    } else {
        res.json({ response: userLoginStatus });
    }
});

userRoute.put('/:userid', async (req, res) => {
    const { userid } = req.params;
    const { name, password } = req.body;
    const user = await users.updateUser(userid, name, password);
    res.json({ user });
});

userRoute.post('/auth', authorization);

export default userRoute;
