const express = require('express');
const router = express.Router();
const {
    getUsers
} = require('../contollers/userController');
const {
    getFilms
} = require('../contollers/filmController');
const {
    getReviews
} = require('../contollers/reviewController');


router.get('/users', getUsers);
router.get('/films', getFilms);
router.get('/reviews', getReviews);

module.exports = router;