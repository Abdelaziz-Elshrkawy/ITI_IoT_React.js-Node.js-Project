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
        if (responseStatus() === 'Success') {
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

userRoute.get('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    res.json(await users.login(email, password));
});

userRoute.get('/img/:id', async (req, res) => {
    const imageObject = await userImage.getImage(req.params.id);
    res.send(
        `<img src="data:${
            imageObject.contentType
        };base64,${imageObject.data.toString(
            'base64',
        )}" style="width: 400px;">`,
    );
});
export default userRoute;
