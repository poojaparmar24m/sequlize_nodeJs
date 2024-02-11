const { Router } = require("express");
const { usercontroller } = require("../controllers");

const router = Router();

router.get("/", usercontroller.getAllData);

router.get("/:id", usercontroller.getDataById);

router.delete("/deleteData/:id", usercontroller.deleteDataById);

router.put("/updateData/:id", usercontroller.updateDataById);

module.exports = router;
