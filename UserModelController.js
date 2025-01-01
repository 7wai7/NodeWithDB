import UserModelService from './UserModelService.js';

class UserModelController {
    async create(req, res) {
        try {
            const model = await UserModelService.create(req.body);
            res.json({ message: "Модель успішно створена", model });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getOne(req, res) {
        try {
            const { name } = req.params;
            const post = await UserModelService.getOne(name);
            return res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await UserModelService.getAll();
            res.json(posts);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await UserModelService.update(req.body);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async delete(req, res) {
        try {
            const { name } = req.params;
            const post = await UserModelService.delete(name);
            res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async deleteArray(req, res) {
        try {
            await UserModelService.deleteArray(req.body);
            res.status(200).send();
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new UserModelController();