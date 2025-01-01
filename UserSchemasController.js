import UserSchemasService from './UserSchemasService.js';

class UserSchemasController {
    async create(req, res) {
        try {
            const model = await UserSchemasService.create(req.body);
            res.json({ message: "Схема успішно створена", model });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getOne(req, res) {
        try {
            const { name } = req.params;
            const post = await UserSchemasService.getOne(name);
            return res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await UserSchemasService.getAll();
            res.json(posts);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await UserSchemasService.update(req.body);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async delete(req, res) {
        try {
            const { name } = req.params;
            const post = await UserSchemasService.delete(name);
            res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async deleteArray(req, res) {
        try {
            await UserSchemasService.deleteArray(req.body);
            res.status(200).send();
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new UserSchemasController();