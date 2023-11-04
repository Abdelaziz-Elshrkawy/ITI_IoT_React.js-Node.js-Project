import { Schema } from 'mongoose';

export const UsersSchema = new Schema({
    name: String,
    email: String,
    password: String,
    imageId: {
        type: Schema.Types.ObjectId,
        ref: 'user-image',
    },
});
