const { body } = require("express-validator");

const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.registerValidator = [
    /*body("password")
    .notEmpty().withMessage("Password is required")
    .matches(passwordRegexp).withMessage("Password format incorrect")*/
];

validators.loginUsernamePasswordValidator = [
    body("username")
    .notEmpty().withMessage("Username is required")
    .isString().withMessage("Username must be a string"),
    body("password")
    .notEmpty().withMessage("Password is required")
    .isString().withMessage("Password must be a string")
];

module.exports = validators;