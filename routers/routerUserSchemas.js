import Router from "express";
import UserSchemasController from '../UserSchemasController.js';

const router = new Router();


router.post('/', UserSchemasController.create);

router.get('/:name', UserSchemasController.getOne);

router.get('/', UserSchemasController.getAll);

router.put('/:name', UserSchemasController.update);

router.delete('/', UserSchemasController.delete);

export default router;