import Router from "express";
import UserController from '../UserController.js';
import authMiddleware from '../middleware/middlewares.js';

const router = new Router();


router.use(authMiddleware);

router.post('/register', UserController.registration);

router.post('/login', UserController.authorization);

router.get('/user', UserController.getOne);

export default router;
