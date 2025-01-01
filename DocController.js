import DocService from './DocService.js';

class DocController {
    async create(req, res) {
        try {
            const { name_model } = req.params;
            const post = await DocService.create(name_model, req.body);
            res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getOne(req, res) {
        try {
            const { name_model, id } = req.params;
            const post = await DocService.getOne(name_model, id);
            return res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await DocService.getAll(req.params.name_model);
            res.json(posts);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async update(req, res) {
        try {
            const { name_model, id } = req.params;
            const updatedPost = await DocService.update(name_model, req.body);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async delete(req, res) {
        try {
            const { name_model, id } = req.params;
            const post = await DocService.delete(name_model, id);
            res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new DocController();