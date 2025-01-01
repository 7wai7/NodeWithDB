import Router from "express";
import DocController from '../DocController.js';

const router = new Router();

router.post('/:schemaName', DocController.create);

router.get('/:schemaName/:id', DocController.getOne);

router.get('/', DocController.getAll);

router.get('/:schemaName', DocController.getAll);

router.put('/:schemaName', DocController.update);

router.delete('/:schemaName/:id', DocController.delete);

export default router;