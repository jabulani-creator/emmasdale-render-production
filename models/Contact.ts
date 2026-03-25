import mongoose from "mongoose";
import validator from 'validator';

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please Provide First Name'],
        minlength: 2,
        maxlength: 30,
    },
    lastName: {
        type: String,
        required: [true, 'Please Provide Last Name'],
        minlength: 2,
        maxlength: 30,
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail as any,
            message: 'Please provide a valid email'
        }
    },
    phone: {
        type: String, 
        required: [true, 'Please Provide Phone Number'],
    }, 
    purpose: {
        type: String,
        enum: ['prayer', 'baptism', 'membership', 'visitation', 'general', 'wedding'],
        default: 'prayer',
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'completed'],
        default: 'pending',
    },
    // This is the "Smart Payload" that can hold any arbitrary data based on the purpose
    additionalInfo: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    // Keep legacy message field just in case
    message: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Contact', ContactSchema);