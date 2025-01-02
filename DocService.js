import { getSchemaModel, getAllSchemaModels } from './models/SchemaModel.js';
import GeneralCollection from './models/GeneralCollection.js';

class DocService {
    async create(schemaName, documentData) {
        const model = await getSchemaModel(schemaName);
        return await model.create(documentData);
    }

    async getOne(schemaName, id) {
        if(!id) {
            throw new Error("ID не вказаний");
        }
        
        const model = await getSchemaModel(schemaName);
        const doc = await model.findById(id);
        return doc;
    }

    async getAll(schemaName) {
        if(schemaName) {
            const model = await getSchemaModel(schemaName);
            return await model.find();
        } else {
            const docs = [];
            const models = await getAllSchemaModels();
            for (const model of models) {
                const modelDocs = await model.find();
                for (const doc of modelDocs) {
                    docs.push(doc);
                }
            }
            return docs;
        }
    }

    async update(schemaName, document) {
        if(!document._id) {
            throw new Error("ID не вказаний");
        }
        
        const model = await getSchemaModel(schemaName);
        return await model.findByIdAndUpdate(document._id, document, { new: true });
    }

    async delete(schemaName, id) {
        if(!id) {
            throw new Error("ID не вказаний");
        }
        if(!schemaName) {
            throw new Error("Назва моделі не вказана");
        }
        
        const model = await getSchemaModel(schemaName);
        return await model.findByIdAndDelete(id);
    }

    async moveManyDocsToGeneralCollection(schemaName){
        if(!schemaName) {
            throw new Error("The name of the scheme is not specified");
        }

        const model = getSchemaModel(schemaName);
        const documents = await model.find();
      
        if (documents.length === 0) {
            throw new Error(`No documents found in schema '${schemaName}'`);
        }
      
        const movedDocuments = documents.map(doc => ({
          originalSchema: schemaName,
          documentData: doc.toObject()
        }));
      
        await GeneralCollection.insertMany(movedDocuments);
        await model.deleteMany();
      };
      
    
      async moveDocToGeneralCollection(schemaName, docID){
        if(!schemaName) {
            throw new Error("The name of the scheme is not specified");
        }
        if(!docID) {
            throw new Error("The ID of the document is not specified");
        }

        const model = getSchemaModel(schemaName);
        const documentCount = await model.countDocuments();
      
        if (documentCount === 0) return;
      
        const document = await model.findById(docID);
        const movedDocument = {
            originalSchema: schemaName,
            documentData: document.toObject()
        };
      
        await GeneralCollection.create(movedDocument);
        await model.findByIdAndDelete(docID);
      };
    
}

export default new DocService();