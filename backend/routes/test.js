var router = require("express").Router();
var controller = require("../controllers/testController");

router.get("/", controller.test); 

module.exports = router;
