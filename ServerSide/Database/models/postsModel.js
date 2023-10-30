import { PostsSchema } from '../Schemas/postSchema.js';
import connection from '../connection.js';

export default class PostsMethods {
    #postsModel
    constructor(modelName) {
        this.#postsModel = connection.model(modelName, PostsSchema);
    }

    addPost = async (userId, title, body) => {
        try {
            const post = await this.#postsModel({
                title,
                body,
                userId,
                imageId,
            });
            await post.save();
            return { post };
        } catch (err) {
            return err;
        }
    };

    findPosts = async (userId) => {
        try {
            if (userId) {
                return await this.#postsModel.find({ userId });
            } else {
                return await this.#postsModel.find();
            }
        } catch (err) {
            return err;
        }
    };

    deletePost = async (userId, PostId) => {
        try {
            return this.#postsModel.deleteOne({
                $and: [{ userId, _id: PostId }],
            });
        } catch (err) {
            return err;
        }
    };
}
