import { Schema } from "mongoose";

export const UsersSchema = new Schema({
    name: String,
    age: String,
    email: String,
    username: String,
    password: String
})