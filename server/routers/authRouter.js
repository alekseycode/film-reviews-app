const express = require('express');
const { postLogin, logOut } = require('../contollers/authController');
const router = express.Router();

router.post('/login', postLogin);
router.get('/logout', logOut);

module.exports = router;