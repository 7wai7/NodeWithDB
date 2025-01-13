import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function authMiddleware(req, res, next) {
    if (req.headers.authorization) {
        await jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.TOKEN_KEY,
            async (err, payload) => {
                if (err) next();
                else if (payload) {
                    const user = await User.findById(payload.id);
                    

                    if (user) {
                        req.user = user;
                        next();
                    } else
                        return res.status(401).json({ message: 'Not registered' });
                }
            }
        );
    } else next();
}