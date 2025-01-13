import TaskService from "./services/TaskService.js";

class TaskController {
    async create(req, res, next) {
        try{
            const taskData = {
                ...req.body,
                user: req.user._id
            }
            const task = await TaskService.create(taskData);
            res.status(201).json(task);
        } catch(err) {
            next(err);
        }
    }

    async getOne(req, res, next) {
        try{
            const task = await TaskService.getOne(req.params.id, req.user._id);
            res.json(task);
        } catch(err) {
            next(err);
        }
    }

    async getMany(req, res, next) {
        try{
            const task = await TaskService.getMany(req.user._id);
            res.json(task);
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const updated = await TaskService.update(req.params.id, req.user._id, req.body);
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await TaskService.delete(req.params.id, req.user._id);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }
}

export default new TaskController();