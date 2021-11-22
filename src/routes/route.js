const express = require('express');
const router = express.Router();

const OrderController=require('../controllers/orderController.js')
const UserController=require('../controllers/userController')
const ProductController=require("../controllers/productController.js")

const Middleware=require("../controllers/middleware.js")




router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//user API
router.post('/createUser',Middleware.validate, UserController.createUser);
//product API
router.post('/createProduct', ProductController.createProduct)
//Total Order API
router.get('/createOrder',Middleware.validate,OrderController.createOrder )


module.exports = router;     