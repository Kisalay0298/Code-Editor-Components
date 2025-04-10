import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    createdAt: Date,
    updatedAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)