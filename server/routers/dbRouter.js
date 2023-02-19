const express = require('express');
const router = express.Router();
const {
    getUsers
} = require('../contollers/userController');
const {
    getFilms
} = require('../contollers/filmController');

router.get('/users', getUsers);
router.get('/films', getFilms);

module.exports = router;