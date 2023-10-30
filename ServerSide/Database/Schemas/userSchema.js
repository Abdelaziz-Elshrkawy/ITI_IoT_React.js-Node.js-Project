import mongoose, { Schema } from 'mongoose';

export const UsersSchema = new Schema({
    age: String || Number,
    name: String,
    email: String,
    password: String,
});