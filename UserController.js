import User from './models/User.js';
import jwt from 'jsonwebtoken';

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, login } = req.body;

            if (!email || !password || !login) {
                return res.status(400).send('Email, password and login are required')
            }

            const user = await User.create(req.body);

            res.json({
                id: user._id,
                login: user.login,
                token: jwt.sign({ id: user._id }, process.env.TOKEN_KEY),
            });
        } catch (err) {
            next(err);
        }
    }

    async authorization(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send('Email and password are required')
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send('User not found')
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).send('Invalid password')
            }

            res.json({
                id: user._id,
                login: user.login,
                token: jwt.sign({ id: user._id }, process.env.TOKEN_KEY),
            });
        } catch (err) {
            next(err);
        }
    }

    async getOne(req, res) {
        if (req.user) return res.status(200).json(req.user);
        else
            return res.status(401).json({ message: 'Not authorized!!' });
    }
}

export default new UserController();