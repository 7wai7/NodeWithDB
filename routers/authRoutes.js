import Router from "express";
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middleware/middlewares.js';

const router = new Router();


router.post('/register', UserController.registration);

router.post('/login', UserController.authorization);

router.get('/', authMiddleware, UserController.getOne);

export default router;
