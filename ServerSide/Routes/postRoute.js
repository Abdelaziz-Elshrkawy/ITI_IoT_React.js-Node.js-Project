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
        try {
            const { title, body, userId } = req.body;
            const file = req.file;
            const imageObject = await postImage.addImage(
                file.buffer,
                file.mimetype,
            );
            await posts.addPost(userId, imageObject._id, title, body);
            res.json({ response: 'Success' });
        } catch (err) {
            res.json({ response: err.message });
        }
    },
);

postRoute.get('/:userid?', authorization, async (req, res) => {
    const userId = req.params.userid;
    const postResponse = await posts.findPosts(userId);
    const response = [];
    for (let i = 0; i < postResponse.length; i++) {
        response[i] = {
            title: postResponse[i].title,
            body: postResponse[i].body,
            image: `data:${
                postResponse[i].imageId.contentType
            };base64,${postResponse[i].imageId.data.toString('base64')}`,
        };
        if (!userId) {
            response[i].username = postResponse[i].userId.name;
        }
    }
    res.json({ response });
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
