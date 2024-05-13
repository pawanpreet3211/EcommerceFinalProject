var router = require("express").Router();
var controller = require("../controllers/productsController");

router.get("/get", controller.get); 
router.post("/add", controller.add); 

module.exports = router;
