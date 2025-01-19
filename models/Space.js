import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const spaceSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: "User", required: true },
    name: { type: String, required: true, minlength: 3, maxlength: 12, }
}, {
    timestamps: true
});

// Комбінований унікальний індекс
// Унікальність поля name перевіряється тільки в межах одного користувача (user)
spaceSchema.index({ user: 1, name: 1 }, { unique: true });

spaceSchema.pre("remove", async function (next) {
    console.log('remove');
    
    await mongoose.model("Task").deleteMany({ space: this._id });
    next();
});


export default mongoose.model("Space", spaceSchema);