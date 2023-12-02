const { body, param } = require('express-validator');
const validators = {};

validators.createPostValidator = [
    param("id")
    .optional()
    .isMongoId().withMessage("Identifier must be a mongo Id"),
    body("title")
    .notEmpty().withMessage("Title is Required"),
    body("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ max: 200 }).withMessage("Description max lenght is 200 characters"),
    body("image")
    .notEmpty().withMessage("Image is required")
    .isURL().withMessage("Image must be an URL")
];

validators.idInParamsValidator = [
    param("id")
    .notEmpty().withMessage("Id is required")
    .isMongoId().withMessage("Id must be a Mongo Id")
];

module.exports = validators;
