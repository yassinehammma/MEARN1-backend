const { check, validationResult } = require("express-validator");

exports.registerValidation = () => [
  check("firstname", "First name cannot be empty").notEmpty().escape(),
  check("lastname", "Last name cannot be empty").notEmpty().escape(),
  check("email", "Incorrect type").isEmail().escape(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
    max: 15,
  }),
];

exports.validator =(req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).send(errors.array());
};