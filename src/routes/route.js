const express = require('express');

const router = express.Router();

const cowinController= require('../controller/cowinController')

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

module.exports = router;


// getlondon API
router.get('/london/wether',cowinController.getLondonWether)
// getceties API
router.get('/cities/sort',cowinController.sortCities)