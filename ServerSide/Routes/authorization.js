import jsonwebtoken from 'jsonwebtoken';
import { jwt_secret } from '../env.js';

export const createJWT = (userId, username) => {
    return jsonwebtoken.sign(
        {
            userId,
            username,
        },
        jwt_secret,
        {
            expiresIn: '7d',
        },
    );
};

const authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ');
        if (token) {
            jsonwebtoken.verify(token[1], jwt_secret);
        }
        next();
    } catch (err) {
        res.json({ response: err.message || 'not authorized' });
    }
};

export default authorization;
