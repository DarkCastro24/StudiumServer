const express = require("express");
const router = express.Router();

const emailRouter = require('./email.router');
const authRouter = require('./auth.router');
const courseRouter = require('./course.router');
const userRouter = require('./user.router');
const tutoringRouter = require('./tutoring.router');

router.use("/auth", authRouter);
router.use("/email", emailRouter);
router.use("/course", courseRouter);
router.use("/user", userRouter);
router.use("/tutoring", tutoringRouter);

module.exports = router;