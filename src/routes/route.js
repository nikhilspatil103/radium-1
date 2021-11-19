const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")
const PublisherController=require("../controllers/publisherController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


// Authors API
router.post('/createAuthor',  authorController.createAuthor  );

// Publisher API
router.post('/publisher',PublisherController.publisher)


// Books API
router.post('/createBook',  BookController.createBook  );
router.get('/getBooks',  BookController.getBooks  );


module.exports = router; 