import Router from "express";
import DocController from '../DocController.js';

const router = new Router();

router.post('/:name_model', DocController.create);

router.get('/:name_model/:id', DocController.getOne);

router.get('/', DocController.getAll);

router.get('/:name_model', DocController.getAll);

router.put('/:name_model', DocController.update);

router.delete('/:name_model/:id', DocController.delete);

export default router;