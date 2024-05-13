var router = require("express").Router();
var controller = require("../controllers/transactionController");

router.post("/getUserTransaction", controller.getUserTransactions); 
router.post("/makeTransaction", controller.makeTransaction); 

module.exports = router;
