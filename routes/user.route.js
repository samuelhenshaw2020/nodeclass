const {Router} = require("express");
const { body, oneOf } = require("express-validator");
const { Register , Login,Logout, currentUser} = require("../controllers/AuthController");
const auth = require("../middlewares/auth");
const { LoginValidator, RegisterValidator } = require("../validators/AuthValidator");
const {Upload} = require('../controllers/uploadController')

const router =  Router();

router.post("/register", RegisterValidator, Register)

router.post("/login" ,Login);
router.post("/upload", Upload);

router.get("/user", [auth] , currentUser);

module.exports = router;