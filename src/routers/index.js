const { Router } = require("express");
const loginRouter = require("./login.router");
const userRouter = require("./user.router");

const router = Router();

router.use("/users", loginRouter);

router.use("/userData", userRouter);

module.exports = router;
