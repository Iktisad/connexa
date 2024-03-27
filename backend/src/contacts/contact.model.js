import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the contact schema
const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    company: String,
    phone: {
        type: String,
        required: true,
        // match: /^\+\d{1,4} \d{1,4} \d{6,14}$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    website: {
        type: String,
        match: /^https?:\/\/\S+\.\S+$/,
    },
    address: {
        unitNumber: Number,
        civicNumber: Number,
        street: String,
        city: String,
        province: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 2,
            uppercase: true,
        },
        postalCode: {
            type: String,
            required: true,
            match: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
        },
    },
});

// Compile the schema into a model
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
