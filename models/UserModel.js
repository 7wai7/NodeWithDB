import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    schema: { type: Object, required: true }
});


export default mongoose.model('UserSchema', UserModel);