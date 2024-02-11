const { Router } = require("express");
const { logincontroller } = require("../controllers");

const router = Router();

router.post("/", logincontroller.create_users);

router.post("/login", logincontroller.login_user);

router.get("/auth", logincontroller.authToken);

module.exports = router;
