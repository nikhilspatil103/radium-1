const mongoose=require('mongoose')
const UserModel = require('../models/userModel.js')
const OrderModel=require('../models/orderModel.js')
const ProductModel=require('../models/productModel.js')


const createOrder = async function (req, res) {
    let orderData = req.body 
    let user= await UserModel.findById(orderData.userId)
    if(!user){
        res.send("User does not exist")
    }

    let product= await ProductModel.findById(orderData.productId)
    if(!product){
        res.send("Product doest exits")
    }
//!-----------------------------------------------------------------//    
    let isFreeApp= req.isFreeAppUser
    let orderAmount

    if(isFreeApp){
        orderAmount=0
    }else if(!isFreeApp && user.balance >= product.price){
        orderAmount=product.price
    }else {
       return res.send({message: "User doesn't have enough balance. Order can't be processed" })
    }
//!---------------------------------------------------------------------//
    orderData.amount=orderAmount
    orderData.isFreeAppUser=isFreeApp
    orderData.date= Date()
    let orderCreated=await OrderModel.create(orderData)

    if(!isFreeApp && user.balance >= product.price){
        await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(orderData.userId)},{ balance: user.balance - product.price })
    }

    return res.send({data: orderCreated})
}




module.exports={
     createOrder
}
