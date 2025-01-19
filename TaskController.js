import TaskService from "./services/TaskService.js";

class TaskController {
    async createSpace(req, res, next) {
        try{
            const spaceData = {
                user: req.user._id,
                name: req.params.space_name
            }
            const space = await TaskService.createSpace(spaceData);
            res.status(201).json(space);
        } catch(err) {
            next(err);
        }
    }
    
    async getSpaces(req, res, next) {
        try{
            const space = await TaskService.getSpaces(req.user._id);
            res.status(200).json(space);
        } catch(err) {
            next(err);
        }
    }
    
    async deleteSpace(req, res, next) {
        try{
            await TaskService.deleteSpace(req.params.space_id, req.user._id);
            res.status(204).end();
        } catch(err) {
            next(err);
        }
    }


    async create(req, res, next) {
        try{
            const taskData = {
                ...req.body,
                user: req.user._id,
                space: req.params.space_id
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
            const task = await TaskService.getMany(req.user._id, req.params.space_id);
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