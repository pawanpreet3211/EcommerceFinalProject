const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     _id: {
//         type: ObjectId(),
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     passwordHash: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: String,
//         required: true
//     },
//     updatedAt: {
//         type: String,
//         required: true
//     },
// });

// Sub-schema for authMethods
const AuthMethodsSchema = new mongoose.Schema({
    OTP: Boolean,
    biometric: Boolean,
    password: Boolean
});

// Sub-schema for biometrics
const BiometricsSchema = new mongoose.Schema({
    fingerprint: String,
    faceId: String
});

// Sub-schema for preferences
const PreferencesSchema = new mongoose.Schema({
    transactionAlerts: Boolean,
    securityNotifications: Boolean
});

// Schema for Users Collection
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    name: String,
    authMethods: AuthMethodsSchema,
    biometrics: BiometricsSchema,
    preferences: PreferencesSchema,
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    uniquePhrase: String,
    otpVerified: Boolean
});

const userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;
