const { body, check} = require("express-validator");


module.exports.LoginValidator = [
    check("email", "Email is not valid").not().isEmpty().normalizeEmail().isEmail(),
    check('password', "Password is not valid. min is 6 char").not().isEmpty().isLength({min: 6})
]


module.exports.RegisterValidator  = [
    check("email", "Email is not valid").normalizeEmail().isEmail(),
    check("name", "Name is not valid").not().isEmpty(),
    body('password', "Password is not valid").not().isEmpty()
]