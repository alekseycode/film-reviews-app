const express = require('express');
const { postLogin } = require('../contollers/authController');
const router = express.Router();

router.post('/login', postLogin);

module.exports = router;