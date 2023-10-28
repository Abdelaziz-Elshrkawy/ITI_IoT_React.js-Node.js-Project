import mongoose, { Schema } from 'mongoose';

export const UsersSchema = new Schema({
    title: String,
    body: String,
    publisher: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    },
});
