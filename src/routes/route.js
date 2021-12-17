const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const UserController = require('../controller/userController')
const BookController=require('../controller/booksController')
const ReviewController=require('../controller/reviewController')
const UserAuth = require('../Middleware/userAuth')

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


//registerUser API
router.post("/register", UserController.registerUser)
//LoginUser API
router.post('/login', UserController.loginUser)
// create Book API
router.post('/books',BookController.createBook)
// get Books  API
router.get('/books',BookController.getBooks)
// get BooksByID API
router.get('/books/:bookId', BookController.getBooksByID)
// put update API 
router.put('/books/:bookId' ,BookController.updateBooks )
// Delete Book API
router.delete('/books/:bookId',BookController.deleteByBookId)

//Review API
//Create Review API
router.post('/books/:bookId/review',ReviewController.createReview)
//update review API
router.put('/books/:bookId/review/:reviewId', ReviewController.updateReview)
//Delete Review API
router.delete('/books/:bookId/review/:reviewId',ReviewController.deleteReview )
module.exports = router;