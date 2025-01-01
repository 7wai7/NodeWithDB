import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';

class UserModelService {
    async create(userModel) {
        if(Object.keys(userModel.schema).length === 0) {
            throw new Error("Схема пуста");
        }

        if(!!mongoose.models[userModel.name]) {
            throw new Error(`Модель ${userModel.name} вже існує`);
        }

        let dynamicModel;
        try {
            dynamicModel = new mongoose.Schema(userModel.schema);
        } catch (error) {
            throw new Error(`Помилка створення схеми: ${error.message}`);
        }


        // Збереження схеми в базу даних
        const savedSchema = await UserModel.create(userModel);        

        // Реєстрація моделі в mongoose
        mongoose.model(userModel.name, dynamicModel);

        return savedSchema;
    }

    async getOne(name) {
        if(!name) {
            throw new Error("Назва моделі не вказана");
        }
        
        const model = await UserModel.findOne({ name: name });
        
        return model;
    }

    async getAll() {
        return await UserModel.find();
    }

    async update(model) {
        if(!model._id) {
            throw new Error("ID не вказаний");
        }
        
        return await UserModel.findByIdAndUpdate(model._id, model, { new: true });
    }

    async delete(name) {
        if(!name) {
            throw new Error("Назва моделі не вказана");
        }
        
        return await UserModel.findOneAndDelete({ name: name });
    }

    async deleteArray(arr) {
        for (const name of arr) {
            await UserModel.findOneAndDelete({ name: name });
        }
    }
    
    async getModel(modelName) {
        const userModel = await this.getOne(modelName);
        if (!userModel) {
            throw new Error(`Модель ${modelName} не існує`);
        }

        // Перевіряємо, чи модель вже зареєстрована
        if (mongoose.models[userModel.name]) {
            return mongoose.models[userModel.name];
        } else {
            // Створюємо схему динамічно
            const schema = new mongoose.Schema(userModel.schema);
            return mongoose.model(userModel.name, schema);
        }
    }
    
    async getModels() {
        const userModels = await this.getAll();
        const models = [];
        
        for (const userModel of userModels) {
            // Перевіряємо, чи модель вже зареєстрована
            if (mongoose.models[userModel.name]) {
                models.push(mongoose.models[userModel.name]);
            } else {
                // Створюємо схему динамічно
                const schema = new mongoose.Schema(userModel.schema);
                models.push(mongoose.model(userModel.name, schema));
            }
        }

        return models;
    }
}

export default new UserModelService();