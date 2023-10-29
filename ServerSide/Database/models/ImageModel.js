import { ImageSchema } from '../Schemas/imagesSchema.js';
import connection from '../connection.js';

export default class ImageMethods {
    #imageModel;
    constructor(modelName, ref) {
        this.#imageModel = connection.model(modelName, ImageSchema(ref));
    }

    addImage = async (fkId, data, contentType) => {
        try {
            const image = new this.#imageModel({
                fkId,
                data,
                contentType,
            });
            await image.save();
            return image;
        } catch (err) {
            return err;
        }
    };

    getImage = (fkId) => {
        return this.#imageModel.findOne({ fkId });
    };

    editImage = () => {};
}
