import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: "User", required: true },
    space: { type: ObjectId, ref: "Space", required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: ''},
    status: {
        type: String,
        enum : ['To Do','In Progress', 'Completed', 'On Hold', 'Canceled', 'Archived'],
        default: 'To Do',
        index: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: { type: Date }
}, {
    timestamps: true
});

export default mongoose.model("Task", taskSchema);