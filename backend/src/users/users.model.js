import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Compile the schema into a model
const User = mongoose.model("User", userSchema);

export default User;
