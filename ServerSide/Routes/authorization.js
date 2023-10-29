import jsonwebtoken from 'jsonwebtoken';
import { jwt_secret } from '../env.js';

const authorization = (req, res, next) => {
    try {
        const token = req.headers.Authorization?.split(' ');
        const decoding = jsonwebtoken.verify(token[1], jwt_secret);
        if (decoding.exp < Date.now() / 1000) {
            throw new Error('token expired');
        }
    } catch (err) {
        res.status(402).send(err);
    }
    next();
};

export default authorization;
