const app = require("express");
const authController = require("../controllers/auth");
const router = app.Router();
const { body, validationResult } = require("express-validator");

const registerValidation = [
    body("firstname").isString(),
    body("lastname").isString(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
];

const signinValidation = [body("email").isEmail(), body("password").isLength({ min: 5 })];

router.post("/signin", signinValidation, authController.signIn);
router.post("/register", registerValidation, authController.register);

module.exports = router;
