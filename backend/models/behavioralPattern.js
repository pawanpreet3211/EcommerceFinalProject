const mongoose = require("mongoose");

// Sub-schema for deviceInfo
const DeviceInfoSchema = new mongoose.Schema({
    deviceType: String,
    OS: String
});

// Schema for Behavioral Patterns Collection
const BehavioralPatternSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    sessionPatterns: [{
        sessionId: String,
        actions: [{
            actionType: String,
            timestamp: Date,
            page: String
        }],
        sessionStart: Date,
        sessionEnd: Date
    }],
    deviceInfo: DeviceInfoSchema,
    createdAt: {
        type: Date,
        required: true
    }
});

const BehavioralPatternModel = mongoose.model("BehavioralPatterns", BehavioralPatternSchema);
module.exports = BehavioralPatternModel;
