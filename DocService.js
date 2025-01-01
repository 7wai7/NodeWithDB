import UserModelService from './UserModelService.js';

class DocService {
    async create(modelName, document) {
        const model = await UserModelService.getModel(modelName);
        return await model.create(document);
    }

    async getOne(modelName, id) {
        if(!id) {
            throw new Error("ID не вказаний");
        }
        
        const model = await UserModelService.getModel(modelName);
        const doc = await model.findById(id);
        return doc;
    }

    async getAll(modelName) {
        if(modelName) {
            const model = await UserModelService.getModel(modelName);
            return await model.find();
        } else {
            const docs = [];
            const models = await UserModelService.getModels();
            for (const model of models) {
                const modelDocs = await model.find();
                for (const doc of modelDocs) {
                    docs.push(doc);
                }
            }
            return docs;
        }
    }

    async update(modelName, document) {
        if(!document._id) {
            throw new Error("ID не вказаний");
        }
        
        const model = await UserModelService.getModel(modelName);
        return await model.findByIdAndUpdate(document._id, document, { new: true });
    }

    async delete(modelName, id) {
        if(!id) {
            throw new Error("ID не вказаний");
        }
        if(!modelName) {
            throw new Error("Назва моделі не вказана");
        }
        
        const model = await UserModelService.getModel(modelName);
        return await model.findByIdAndDelete(id);
    }
    
}

export default new DocService();