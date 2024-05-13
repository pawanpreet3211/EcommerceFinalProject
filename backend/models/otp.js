const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone: String,
  email: String,
  otp: Number,
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } } // OTP expires after 5 minutes
});

const OtpModel = mongoose.model('Otp', otpSchema);
module.exports = OtpModel;
