import { SchemaModel } from './models/SchemaModel.js';

class UserModelService {
    async create(userSchema) {
        /* if(Object.keys(userModel.schema).length === 0) {
            throw new Error("Схема пуста");
        } */

        return await SchemaModel.create(userSchema);  
    }

    async getOne(name) {
        if(!name) {
            throw new Error("Назва моделі не вказана");
        }
        
        const model = await SchemaModel.findOne({ name: name });
        
        return model;
    }

    async getAll() {
        return await SchemaModel.find();
    }

    async update(schema) {
        if(!schema._id) {
            throw new Error("ID не вказаний");
        }
        
        return await SchemaModel.findByIdAndUpdate(schema._id, sc, { new: true });
    }

    async delete(name) {
        if(!name) {
            throw new Error("Назва моделі не вказана");
        }
        
        return await SchemaModel.findOneAndDelete({ name: name });
    }

    async deleteArray(arr) {
        for (const name of arr) {
            await SchemaModel.findOneAndDelete({ name: name });
        }
    }
}

export default new UserModelService();