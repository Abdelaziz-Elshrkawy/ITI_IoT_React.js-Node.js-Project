import { Schema } from 'mongoose';

export const UsersSchema = new Schema({
    name: String,
    age: String || Number,
    email: String,
    username: String,
    password: String,
    image: {
        data: Buffer,
        contentType: String
    }
});
