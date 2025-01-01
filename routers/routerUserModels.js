import Router from "express";
import UserModelController from '../UserModelController.js';

const router = new Router();


router.post('/', UserModelController.create);

router.get('/:name', UserModelController.getOne);

router.get('/', UserModelController.getAll);

router.put('/:name', UserModelController.update);

router.delete('/:name', UserModelController.delete);

router.delete('/', UserModelController.deleteArray);

export default router;