const express = require('express');
const router = express.Router();

const {
    getUsers
} = require('../contollers/userController');

router.get('/users', getUsers);

module.exports = router;