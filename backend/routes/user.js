var router = require("express").Router();
var controller = require("../controllers/userController");
// var controller2 = require("../controllers/verificationStatusController");

router.post("/signup", controller.signup);
router.post("/login", controller.login); 
router.post("/getInfo", controller.info); 
router.post("/update-password", controller.updatePassword); 
router.post("/set-phrase", controller.setUniquePhrase); 
router.post("/update-phrase", controller.updateUniquePhrase); 
router.post("/verify-phrase", controller.verifyPhrase); 
// router.post("/getAuthStatus", controller2.getStatus);

module.exports = router;
