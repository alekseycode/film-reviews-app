const express = require('express');
const router = express.Router();
const {
    getUsers, getUsersById, getUsersReviews, getUsersReviewsByFilmId
} = require('../contollers/userController');
const {
    getFilms, getFilmById
} = require('../contollers/filmController');
const {
    getReviews, getReviewsByFilmId
} = require('../contollers/reviewController');


router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.get('/usersReviews/:id', getUsersReviewsByFilmId);

router.get('/films', getFilms);
router.get('/films/:id', getFilmById);

router.get('/reviews', getReviews);
router.get('/reviews/:id', getReviewsByFilmId);



module.exports = router;