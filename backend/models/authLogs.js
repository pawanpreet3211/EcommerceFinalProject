const mongoose = require("mongoose");

// Sub-schema for deviceInfo
const DeviceInfoSchema = new mongoose.Schema({
    deviceType: String,
    OS: String
});

// Schema for AuthenticationLogs Collection
const AuthenticationLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    method: String,
    success: Boolean,
    timestamp: Date,
    location: String,
    deviceInfo: DeviceInfoSchema
});

const AuthenticationLogsModel = mongoose.model("AuthenticationLogs", AuthenticationLogSchema);
module.exports = AuthenticationLogsModel;
