const express = require('express');
const jwt = require('jsonwebtoken')

const router = express.Router();

const OrderController=require('../controllers/userController.js')
const Middleware=require('../middleware/middleware.js')

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});



//createuser API   
router.post('/createUser', OrderController.createUser);
//login API
router.post('/loginUser', OrderController.loginUser);
// getUserDetails
router.get('/user/:userId',Middleware.tokenCheck,OrderController.getUserDetails)
// update email
router.put('/user/:userId',Middleware.tokenCheck,OrderController.updateEmail)
module.exports = router; 