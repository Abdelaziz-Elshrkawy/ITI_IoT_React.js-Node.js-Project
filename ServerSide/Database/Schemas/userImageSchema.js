import { Schema } from 'mongoose';

export const UserImageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    contentType: String,
    data: Buffer,
});
