const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const UserController = require('../controller/userController')
const BookController=require('../controller/booksController')
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
// get Books
router.get('/books',BookController.getBooks)

module.exports = router;