import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    emergencyContactName: {
        type: String,
        required: true
    },
    emergencyContactNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
