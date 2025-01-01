import { SchemaModel } from './models/SchemaModel.js';

class UserSchemasService {
    async create(userSchema) {
        return await SchemaModel.create(userSchema);  
    }

    async getOne(name) {
        if(!name) {
            throw new Error("Назва схеми не вказана");
        }
        
        return await SchemaModel.findOne({ name: name });
    }

    async getAll() {
        return await SchemaModel.find();
    }

    async update(schema) {
        if(!schema._id) {
            throw new Error("ID не вказаний");
        }
        
        return await SchemaModel.findByIdAndUpdate(schema._id, schema, { new: true });
    }

    async delete(name) {
        if(!name) {
            throw new Error("Назва схеми не вказана");
        }
        
        return await SchemaModel.findOneAndDelete({ name: name });
    }

    async deleteArray(arr) {
        for (const name of arr) {
            await SchemaModel.findOneAndDelete({ name: name });
        }
    }
}

export default new UserSchemasService();