import { UserImageSchema } from '../Schemas/userImageSchema.js';
import connection from '../connection.js';

export default class UserImageMethods {
    #imageModel = connection.model('user-image', UserImageSchema);

    addImage = async (userId, data, contentType) => {
        try {
            const image = new this.#imageModel({
                userId,
                data,
                contentType,
            });
            await image.save();
            return image;
        } catch (err) {
            return err;
        }
    };

    getImage = (userId) => {
        return this.#imageModel.findOne({ userId });
    };
}
