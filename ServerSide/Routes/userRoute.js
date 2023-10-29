import { Router } from 'express';
import UsersMethods from '../Database/models/userModel.js';
import multer, { memoryStorage } from 'multer';
import UserImageMethods from '../Database/models/userImageModel.js';
const userRoute = new Router();
const users = new UsersMethods();
const userImage = new UserImageMethods();
userRoute.post(
    '/',
    multer({ storage: memoryStorage() }).single('user-image'),
    async (req, res) => {
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
    },
);

userRoute.post('/login', async (req, res) => {
    console.log('body ' + JSON.stringify(req.body));
    const { email, password } = req.body;
    const userLoginStatus = await users.login(email, password);
    console.log(userLoginStatus);
    if (typeof userLoginStatus === 'object') {
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
export default userRoute;
