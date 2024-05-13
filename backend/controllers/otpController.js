const OtpModel = require("../models/otp");
const twilio = require('twilio');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,  // Sender gmail
      pass: process.env.EMAIL_APP_PASS  // Gmail App Password
    }
});

exports.send = async (req, res) => {
    try {
        const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const phone = req.body.phone;
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        console.log("phone number: ", phone);

        const existingOtp = await OtpModel.findOne({ phone: phone });

        const message = await twilioClient.messages.create({
            body: `Your OTP against your transaction at SecureCommerce is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        // // Check if phone number exists in the database
        // let otpDocument = await OtpModel.findOneAndUpdate(
        //     { phone: phone },
        //     { $set: { otp: otp, createdAt: new Date() } },
        //     { upsert: true, new: true }
        // );

        if (existingOtp) {
            // If phone exists, update the existing OTP
            existingOtp.otp = otp;
            existingOtp.createdAt = new Date(); // Update creation time
            await existingOtp.save();
            console.log("existingOtp document: ", existingOtp);
        } else {
            // If phone does not exist, create a new OTP entry
            const newOtp = new OtpModel({ phone, otp });
            await newOtp.save();
            console.log("newOtp document: ", newOtp);
        }

        console.log("OTP sent! Message: ", message);
        res.status(200).json({
            message: 'OTP sent successfully',
            status: true
        });
    } catch (error) {
        console.error("OTP send error: ", error);

        res.status(500).json({
            error: "Failed to send OTP",
            status: false
        });
    }
};

exports.verifyPhoneOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        const result = await OtpModel.findOne({ phone: phone, otp: otp });

        if (result) {
            res.status(200).json({
                verified: true,
                message: 'OTP verified successfully'
            });
        } else {
            res.status(400).json({
                verified: false,
                message: 'Invalid OTP or OTP expired'
            });
        }
    } catch (error) {
        console.error("Phone OTP verification error: ", error);

        res.status(500).json({
            error: "Failed to verify phone OTP",
            verified: false,
            message: 'Failed to verify phone OTP'
        });
    }
};

exports.verify = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const result = await OtpModel.findOne({ email: email, otp: otp });

        if (result) {
            res.status(200).json({
                verified: true,
                message: 'OTP verified successfully'
            });
        } else {
            res.status(400).json({
                verified: false,
                message: 'Invalid OTP or OTP expired'
            });
        }
    } catch (error) {
        console.error("OTP verify error: ", error);

        res.status(500).json({
            error: "Failed to verify OTP",
            verified: false,
            message: 'Failed to verify OTP'
        });
    }
};

exports.sendMail = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        console.log("Email: ", email);
        console.log("OTP: ", otp);

        console.log("transporter: ", transporter);

        const existingOtp = await OtpModel.findOne({ email: email });

        const mailOptions = {
            from: {
                name: 'SecureCommerce',
                address: process.env.EMAIL
            },
            to: email,
            subject: 'Your OTP for Verification',
            text: `Here is your OTP: ${otp}. It will expire in 5 minutes.`
        };
    
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    
        // Save OTP to the database
        // const newOtp = new OtpModel({ email, otp });
        // await newOtp.save();

        if (existingOtp) {
            // If email exists, update the existing OTP
            existingOtp.otp = otp;
            existingOtp.createdAt = new Date.now(); // Update creation time
            await existingOtp.save();
        } else {
            // If email does not exist, create a new OTP entry
            const newOtp = new OtpModel({ email, otp });
            await newOtp.save();
        }
    
        res.status(200).send('OTP sent successfully');
    } catch (error) {
        console.error("2 OTP send error: ", error);

        res.status(500).json({
            error: "Failed to send OTP"
        });
    }
};
