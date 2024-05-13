var router = require("express").Router();
var controller = require("../controllers/otpController");

router.post("/send-otp", controller.sendMail);
router.post("/send-otp-sms", controller.send);
router.post("/verify-otp", controller.verify);
router.post("/verify-otp-sms", controller.verifyPhoneOTP);

module.exports = router;
