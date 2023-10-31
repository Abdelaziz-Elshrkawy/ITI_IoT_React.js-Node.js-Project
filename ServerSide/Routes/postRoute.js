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
    imageProcessing('post_image'),
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
            image: `data:${postResponse[i].imageId.contentType
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
    const post = await posts.getPost(userid, postid);
    const deleteImage = await postImage.deleteImage(post.imageId)
    console.log(post.imageId)
    const deletePost = posts.deletePost(post._id)
    console.log(`${JSON.stringify(deleteImage)} ::: ${deletePost}`)
    if (
        post &&
        post.deletedCount === 1
    ) {
        res.json({ response: 'deleted' });
    } else {
        res.json({ response: 'not found' });
    }
});

postRoute.put('/:userid/:postid', authorization, async (req, res) => {
    try {
        const { title, body } = req.body;
        const { userid, postid } = req.params;
        const post = await posts.updatePost(userid, postid, title, body);
        if (post.message) {
            res.json({ response: post.message })
        } else {
            res.json({ response: 'updated' })
        }
    } catch (err) {
        res.json({ response: err })
    }
});

export default postRoute;
