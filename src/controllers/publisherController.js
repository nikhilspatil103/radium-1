const PublisherModel=require("../models/publisherModel.js")

const publisher= async function(req,res){
    let publisherData= req.body
    let publisher=await  PublisherModel.create(publisherData)
    res.send({msg:publisher})
}

module.exports.publisher=publisher