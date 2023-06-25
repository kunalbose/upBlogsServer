const router = require("express").Router();
const {registerController, loginController, usernameCheckController, emailCheckController} = require("../controllers/authControllers");


router.post('/register', registerController);

router.post('/login', loginController);

router.post('/username-check', usernameCheckController);

router.post('/email-check', emailCheckController);

module.exports = router;