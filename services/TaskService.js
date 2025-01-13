import Task from "../models/Task.js";

class TaskService {
    async create(taskData) {
        return await Task.create(taskData);
    }

    async getOne(id, userId) {
        return await Task.findById({ _id: id, user: userId });
    }

    async getMany(userId) {
        return await Task.find({ user: userId }).sort({ createdAt: -1 });
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