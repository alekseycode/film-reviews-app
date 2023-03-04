const express = require('express');
const { postLogin, logOut, postRegister, forgotPassword } = require('../contollers/authController');
const router = express.Router();

router.post('/login', postLogin);
router.get('/logout', logOut);

router.post('/register', postRegister)

router.put('/forgotPass', forgotPassword)


module.exports = router;