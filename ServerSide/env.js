import dotenv from 'dotenv';
dotenv.config();

export const { port, mongo_uri_local, salt_rounds, bcrypt_password, jwt_secret } =
    process.env;
