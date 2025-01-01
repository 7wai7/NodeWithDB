import DocService from './DocService.js';

class DocController {
    async create(req, res) {
        try {
            const { schemaName } = req.params;
            const post = await DocService.create(schemaName, req.body);
            res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getOne(req, res) {
        try {
            const { schemaName, id } = req.params;
            const post = await DocService.getOne(schemaName, id);
            return res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await DocService.getAll(req.params.schemaName);
            res.json(posts);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async update(req, res) {
        try {
            const { schemaName, id } = req.params;
            const updatedPost = await DocService.update(schemaName, req.body);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async delete(req, res) {
        try {
            const { schemaName, id } = req.params;
            const post = await DocService.delete(schemaName, id);
            res.json(post);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new DocController();