import { Schema } from 'mongoose';

export const UserImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    contentType: String,
    data: Buffer,
});
