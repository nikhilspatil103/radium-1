const userModel=require('../models/userModel')
const jwt = require('jsonwebtoken')

const createUser= async function(req,res){
    let data=req.body
    let userData= await userModel.create(data)
    res.send({msg:userData})

}


const loginUser= async function(req,res){
    
    if(req.body && req.body.name && req.body.password){
        let user= await userModel.findOne({name : req.body.name, password : req.body.password, isDelete : false})
        if(user){
            let payload={_id : user._id, mobile : user.mobile}
            let generateToken =jwt.sign( payload, 'radium' )

            res.header('x-auth-token' , generateToken)
            res.status(200).send({status: true, data : {userId :user._id}, token :generateToken})
        }else {
            res.status(401).send({status:false, message : "invalid Username or Password"})
        }
    }else {
        res.status(400).send({status:false, message : "Request body must contain Username and Password"})
    }
    // let userName=req.body.name
    // let userPassword= req.body.password
    
    // let user= await userModel.findOne({name:userName,password: userPassword , isDelete : false})
    // if(user){
    //     res.send({status : true, data :user })
    // }else {
    //     res.send ({status : false, message : "invalid credentials"})
    // }
}

const getUserDetails = async function (req,res){
    
    let token = req.headers['x-auth-token']
    let validate= jwt.verify(token , 'radium')
    if(validate){
        if(validate._id == req.params.userId){
            let user = await userModel.findOne({_id : req.params.userId , isDelete : false})
            console.log(user)
            if(user){
                res.status(200).send({status : true , data : user})
            }else {
                res.status(404).send({status : false, message : "User Not Found"})
            }
        }else {
            res.status(403).send({status : false , message : "Not Authorise"})
        }
    }else {
        res.status(401).send({status : false , message : "Invalid Token"})
    }
}

const updateEmail= async function(req,res){
    let token = req.headers['x-auth-token']
    let validate= jwt.verify(token , 'radium')
    if(validate){
        if(validate._id == req.params.userId){
            let user= await userModel.findOne({_id:req.params.userId, isDelete : false})
            if(user){
                let updateEmail= await userModel.findOneAndUpdate({_id : req.params.userId}, {email: req.body.email}, {new:true})
                 
                res.status(200).send({status : true , data : updateEmail}) 
            }else {
                res.status(404).send({status:false , message : "Invalid Username or Password"})
            }
        }else {
            res.status(403).send({status:false , message : "Not authorise"})
        }
    }else {
        res.status(401).send({status:false , message : "Invalid Token"})
    }
}
module.exports={
    createUser,loginUser,getUserDetails,updateEmail
}