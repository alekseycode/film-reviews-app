const express = require('express');
const router = express.Router();
const {
    getUsers
} = require('../contollers/userController');
const {
    getFilms, getFilmById
} = require('../contollers/filmController');
const {
    getReviews
} = require('../contollers/reviewController');


router.get('/users', getUsers);


router.get('/films', getFilms);
router.get('/films/:id', getFilmById);


router.get('/reviews', getReviews);

module.exports = router;