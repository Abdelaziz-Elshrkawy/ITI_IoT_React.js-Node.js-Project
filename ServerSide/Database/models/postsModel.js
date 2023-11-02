import { PostsSchema } from '../Schemas/postSchema.js';
import connection from '../connection.js';

export default class PostsMethods {
    #postsModel;
    constructor(modelName) {
        this.#postsModel = connection.model(modelName, PostsSchema);
    }

    addPost = async (userId, imageId, title, body) => {
        try {
            const post = await this.#postsModel({
                title,
                body,
                userId,
                imageId,
            });
            await post.save();
            return post;
        } catch (err) {
            return err;
        }
    };

    findPosts = async (userId) => {
        try {
            if (userId) {
                return await this.#postsModel
                    .find({ userId })
                    .populate('imageId');
            } else {
                return await this.#postsModel
                    .find()
                    .populate('imageId')
                    .populate('userId');
            }
        } catch (err) {
            return err;
        }
    };

    getPost = async (userId, PostId) => {
        try {
            return await this.#postsModel.findOne({
                $and: [{ userId, _id: PostId }],
            });
        } catch (err) {
            return err;
        }
    };

    updatePost = async (userId, PostId, title, body) => {
        try {
            const post = await this.#postsModel.findOne({
                $and: [{ userId, _id: PostId }],
            });
            post.title = title;
            post.body = body;
            await post.save();
            return post;
        } catch (err) {
            return err;
        }
    };

    deletePost = async (_id) => {
        return await this.#postsModel.deleteOne(_id);
    };
}
