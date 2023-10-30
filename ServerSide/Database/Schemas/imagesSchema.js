import { Schema } from 'mongoose';

export const ImageSchema = new Schema({
    contentType: String,
    data: Buffer,
});
