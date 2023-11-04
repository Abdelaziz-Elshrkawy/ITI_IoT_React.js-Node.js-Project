import mongoose from 'mongoose';
import { mongo_uri_local } from '../env.js';

const connection = mongoose.createConnection(mongo_uri_local);
export default connection;
