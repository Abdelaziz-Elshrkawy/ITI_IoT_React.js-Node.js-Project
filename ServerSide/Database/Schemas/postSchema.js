import mongoose, { Schema } from 'mongoose';

export const UsersSchema = new Schema({
    title: String,
    body: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
});
