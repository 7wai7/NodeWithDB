import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function authMiddleware(req, res, next) {
    if (req.headers.authorization) {
        await jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.TOKEN_KEY,
            async (err, payload) => {
                if (err) res.status(401).json({ message: 'Invalid token or authorization failed' });
                else if (payload) {
                    const user = await User.findById(payload.id);
                    

                    if (user) {
                        req.user = user;
                        next();
                    } else res.status(401).json({ message: 'User not found' });
                }
            }
        );
    } else res.status(401).json({ message: 'Not registered' });
}