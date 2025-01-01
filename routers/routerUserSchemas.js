import Router from "express";
import UserSchemasController from '../UserSchemasController.js';

const router = new Router();


router.post('/', UserSchemasController.create);

router.get('/:name', UserSchemasController.getOne);

router.get('/', UserSchemasController.getAll);

router.put('/:name', UserSchemasController.update);

router.delete('/:name', UserSchemasController.delete);

router.delete('/', UserSchemasController.deleteArray);

export default router;