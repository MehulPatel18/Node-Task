const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth');
const isAuth = require('../../middleware/isAuth');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/getuser', isAuth, authController.getuser);

module.exports = router;