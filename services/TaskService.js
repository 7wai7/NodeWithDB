import Task from "../models/Task.js";
import Space from "../models/Space.js";

class TaskService {
    async createSpace(spaceData) {
        return await Space.create(spaceData);
    }
    
    async getSpaces(userId) {
        return await Space.find({ user: userId });
    }
    
    async deleteSpace(space_id, userId) {
        await Space.deleteOne({ _id: space_id, user: userId  });
    }


    async create(taskData) {
        return await Task.create(taskData);
    }

    async getOne(id, userId) {
        return await Task.findById({ _id: id, user: userId });
    }

    async getMany(userId, space_id) {
        if(space_id) return await Task.find({ user: userId, space: space_id }).sort({ createdAt: -1 });
            else return await Task.find({ user: userId }).sort({ createdAt: -1 });
    }

    async update(id, userId, updates) {
        const task = await Task.findOneAndUpdate(
            { _id: id, user: userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!task) {
            throw createError(404, 'Task not found');
        }

        return task;
    }

    async delete(id, userId) {
        await Task.deleteOne({ _id: id, user: userId });
    }
}

export default new TaskService();