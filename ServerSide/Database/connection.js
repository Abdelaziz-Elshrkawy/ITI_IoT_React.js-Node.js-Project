import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connection = mongoose.createConnection(process.env.mongo_uri_local)
export default connection