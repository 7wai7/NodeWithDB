import getModel from './SchemaModel.js';

class DocService {
    async create(schemaName, documentData) {
        const model = await getModel(schemaName);
        return await model.create(documentData);
    }

    async getOne(schemaName, id) {
        if(!id) {
            throw new Error("ID не вказаний");
        }
        
        const model = getModel(schemaName);
        const doc = await model.findById(id);
        return doc;
    }

    async getAll(schemaName) {
        if(schemaName) {
            const model = getModel(schemaName);
            return await model.find();
        } /* else {
            const docs = [];
            const models = await UserModelService.getModels();
            for (const model of models) {
                const modelDocs = await model.find();
                for (const doc of modelDocs) {
                    docs.push(doc);
                }
            }
            return docs;
        } */
    }

    async update(schemaName, document) {
        if(!document._id) {
            throw new Error("ID не вказаний");
        }
        
        const model = getModel(schemaName);
        return await model.findByIdAndUpdate(document._id, document, { new: true });
    }

    async delete(schemaName, id) {
        if(!id) {
            throw new Error("ID не вказаний");
        }
        if(!schemaName) {
            throw new Error("Назва моделі не вказана");
        }
        
        const model = getModel(schemaName);
        return await model.findByIdAndDelete(id);
    }
    
}

export default new DocService();