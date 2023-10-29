import { Router } from 'express';
import ImageMethods from '../Database/models/ImageModel.js';
import PostsMethods from '../Database/models/postsModel.js';
import authorization from './authorization.js';
import imageProcessing from './helpers/imageProcessing.js';

const postRoute = new Router();
const posts = new PostsMethods();
const postImage = new ImageMethods('post-images', posts.modelName);

postRoute.post(
    '/',
    authorization,
    imageProcessing('post-image'),
    async (req, res) => {
        const { title, body, userId } = req.body;
        const file = req.file
        const postResponse = await posts.addPost(userId, title, body);
        const imageResponse = await postImage.addImage(
            postResponse._id,
            file.buffer,
            file.mimetype
        )
        postResponse.image = imageResponse
        res.json({postResponse});
    },
);

postRoute.get('/:userid?', async (req, res) => {
    const userId = req.params.userid;
    res.json(await posts.findPosts(userId));
});

postRoute.delete('/del/:userid/:postid', authorization, async (req, res) => {
    const { userid, postid } = req.params;
    const deleteResponse = await posts.deletePost(userid, postid);
    if (deleteResponse && deleteResponse.deletedCount === 1) {
        res.json({ response: 'deleted' });
    }
});

export default postRoute;
