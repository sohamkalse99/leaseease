import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    isDeleted: { type: Boolean, required: false ,default: false },
    password: { type: String, required: true},
});


UserSchema.set("timestamps", true);


const User = mongoose.model(
    "User",
    UserSchema
);

export { User };
