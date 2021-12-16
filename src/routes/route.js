const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const UserController = require('../controller/userController')
const UserAuth = require('../Middleware/userAuth')

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


//registerUser API
router.post("/register", UserController.registerUser)
//LoginUser API
router.post('/login', UserController.loginUser)

module.exports = router;