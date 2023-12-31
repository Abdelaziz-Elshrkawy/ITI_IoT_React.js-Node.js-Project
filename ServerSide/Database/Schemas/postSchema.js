import { Schema } from 'mongoose';

export const PostsSchema = new Schema(
    {
        title: String,
        body: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
        imageId: {
            type: Schema.Types.ObjectId,
            ref: 'posts-image',
        },
    },
    { timestamps: true },
);
