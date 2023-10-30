import { Router } from 'express';
import ImageMethods from '../Database/models/ImageModel.js';
import PostsMethods from '../Database/models/postsModel.js';
import authorization from './authorization.js';
import imageProcessing from './helpers/imageProcessing.js';

const postRoute = new Router();
const posts = new PostsMethods('Posts');
const postImage = new ImageMethods('posts-image');

postRoute.post(
    '/',
    authorization,
    imageProcessing('post-image'),
    async (req, res) => {
        const { title, body, userId } = req.body;
        const file = req.file;
        const postResponse = await posts.addPost(userId, title, body);
        const imageObject = await postImage.addImage(
            postResponse._id,
            file.buffer,
            file.mimetype,
        );
        postResponse.image = `data:${
            imageObject.contentType
        };base64,${imageObject.data.toString('base64')}`;
        res.json({ response: postResponse });
    },
);

postRoute.get('/:userid?', authorization, async (req, res) => {
    const userId = req.params.userid;
    res.json({ response: await posts.findPosts(userId) });
});

postRoute.delete('/:userid/:postid', authorization, async (req, res) => {
    const { userid, postid } = req.params;
    const deleteResponse = await posts.deletePost(userid, postid);
    console.log(deleteResponse);
    const deletePostImage = await postImage.deleteImage(postid);
    console.log(deletePostImage);
    if (
        deleteResponse &&
        deleteResponse.deletedCount === 1 &&
        deletePostImage &&
        deletePostImage.deletedCount === 1
    ) {
        res.json({ response: 'deleted' });
    } else {
        res.json({ response: 'not found' });
    }
});

export default postRoute;
