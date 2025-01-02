import mongoose from 'mongoose';
import { getSchemaModel, SchemaDefinition } from './models/SchemaModel.js';
import DocService from './DocService.js';

class UserSchemasService {
    async create(userSchema) {
        return await SchemaDefinition.create(userSchema);  
    }

    async getOne(name) {
        if(!name) {
            throw new Error("The name of the scheme is not specified");
        }
        
        return await SchemaDefinition.findOne({ name: name });
    }

    async getAll() {
        return await SchemaDefinition.find();
    }

    async update(schema) {
        if(!schema._id) {
            throw new Error("The ID of the scheme is not specified");
        }
        
        return await SchemaDefinition.findByIdAndUpdate(schema._id, schema, { new: true });
    }

    async delete(schemaName, docAction) {
        if(!schemaName) {
            throw new Error("The name of the scheme is not specified");
        }

        const model = await getSchemaModel(schemaName);
        const documentCount = await model.countDocuments();

        if(docAction === 'delete documents') {
            if (documentCount > 0) {
                throw new Error(
                    `Cannot delete schema '${schemaName}' because it has ${documentCount} documents.`
                );
            }

            await model.deleteMany();
            return await SchemaDefinition.findOneAndDelete({ name: schemaName });
        } else if(docAction === 'move documents to general') {
            await DocService.moveManyDocsToGeneralCollection(schemaName);
            return await SchemaDefinition.findOneAndDelete({ name: schemaName });
        }

        // схема видаляється лише при виборі обробки документів
        return null;
    }
      
}

export default new UserSchemasService();