const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const runValidation = require("../validators/index.middleware");
const { registerValidator } = require("../validators/auth.validators");

router.post("/register", 
    registerValidator,
    runValidation,
    authController.register
);

router.post("/login", 
    authController.login
);

module.exports = router;
