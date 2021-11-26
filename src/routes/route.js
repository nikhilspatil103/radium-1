const express = require('express');
const axios = require('axios')

const router = express.Router();
const cryptoController=require('../controller/cryptoController')
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

module.exports = router;

// getCrypto API
router.get('/getCrypto',cryptoController.getCrypto)
// ID API
router.get('/getCoin',cryptoController.getCoin)