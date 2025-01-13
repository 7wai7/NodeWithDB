import Router from "express";
import TaskController from '../TaskController.js';
import authMiddleware from '../middleware/middlewares.js';

const router = new Router();

router.use(authMiddleware);

router.post('/', TaskController.create);

router.get('/:id', TaskController.getOne);

router.get('/', TaskController.getMany);

router.put('/:id', TaskController.update);

router.delete('/', TaskController.delete);

export default router;
