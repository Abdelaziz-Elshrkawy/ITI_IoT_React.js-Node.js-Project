import { Schema } from 'mongoose';

export const ImageSchema = (ref) => {
    return new Schema({
        fkId: {
            type: Schema.Types.ObjectId,
            ref,
        },
        contentType: String,
        data: Buffer,
    });
};
