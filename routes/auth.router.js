const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const runValidation = require("../validators/index.middleware");
const { registerValidator, loginUsernamePasswordValidator } = require("../validators/auth.validators");

router.post("/register", 
    registerValidator,
    runValidation,
    authController.register
);

router.post("/login", 
    authController.login
);

router.post("/login/username", 
    loginUsernamePasswordValidator,
    runValidation,
    authController.loginWithUsernamePassword
);

module.exports = router;
