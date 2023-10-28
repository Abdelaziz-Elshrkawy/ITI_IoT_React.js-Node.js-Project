import { Schema } from 'mongoose';

export const ImageSchema = new Schema({
    user: String,
    data: Buffer,
    contentType: String

});