const express = require('express');
const router = express.Router();

const BookModel=require('../models/bookModel.js')
const AuthorModel=require('../models/authorModel')

const BookController=require("../controllers/bookController.js")



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/createBook', BookController.createBook);
router.get('/createAuthor', BookController.createAuthor)
router.get('/listBook', BookController.listBook)
router.post('/authorTwoStates', BookController.authorTwoStates)
router.get('/prizeBt', BookController.prizeBt)

module.exports = router;     