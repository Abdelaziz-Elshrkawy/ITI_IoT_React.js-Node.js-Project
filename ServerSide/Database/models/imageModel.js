import { UserImageSchema } from '../Schemas/imageSchema';
import connection from '../connection';

export default class ImageMethods {
    #imageModel = connection.model('user-image', UserImageSchema);

    addImage = async (user, data, contentType) => {
        try {
            const image = new this.#imageModel({
                user,
                data,
                contentType,
            });
            await image.save();
            return image;
        } catch (err) {
            return err;
        }
    };
}
