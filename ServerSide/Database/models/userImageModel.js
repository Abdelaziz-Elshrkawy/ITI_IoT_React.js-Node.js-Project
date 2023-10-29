import { ImageSchema } from '../Schemas/imagesSchema.js';
import connection from '../connection.js';

export default class UserImageMethods {
    #imageModel = connection.model('user-images', ImageSchema('Users'));

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
