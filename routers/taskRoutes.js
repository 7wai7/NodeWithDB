import Router from "express";
import TaskController from '../controllers/TaskController.js';
import authMiddleware from '../middleware/middlewares.js';

const router = new Router();

router.use(authMiddleware);

router.post('/space/:space_name', TaskController.createSpace);

router.get('/space', TaskController.getSpaces);

router.delete('/space/:space_id', TaskController.deleteSpace);


router.post('/:space_id', TaskController.create);

router.get('/:id', TaskController.getOne);

router.get('/space/:space_id', TaskController.getMany);

router.put('/:id', TaskController.update);

router.delete('/:id', TaskController.delete);

export default router;
