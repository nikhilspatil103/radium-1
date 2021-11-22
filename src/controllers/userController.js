const userModel=require('../models/userModel')


const createUser= async function(req,res){
    let data=req.body
    let userData= await userModel.create(data)
    res.send({msg:userData})

}

module.exports.createUser=createUser