import { ImageSchema } from '../Schemas/imagesSchema.js';
import connection from '../connection.js';

export default class ImageMethods {
    #imageModel;
    constructor(modelName) {
        this.#imageModel = connection.model(modelName, ImageSchema);
    }

    addImage = async (data, contentType) => {
        try {
            const image = new this.#imageModel({
                data,
                contentType,
            });
            await image.save();
            return image;
        } catch (err) {
            return err;
        }
    };

    getImage = (_id) => {
        return this.#imageModel.findOne({ _id });
    };

    deleteImage = (postId) => {
        return this.#imageModel.deleteOne({ fkId: postId });
    };
}
