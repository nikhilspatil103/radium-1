const AuthorModel = require('../models/authorModel.js')
const BookModel=require('../models/bookModel.js')

//!-------------------------------------1st Q----------------------------------------------------------------------------//
//Write create APIs for both books and authors ---> 
//If author_id is not available then do not accept the entry(in neither the aurthor collection onr the books collection)

const createBook= async function(req,res){
    let data = req.body
    let savebook= await BookModel.create(data)
    res.send({msg:savebook})
}
const createAuthor= async function(req,res){
    let data=req.body
    let authorData= await AuthorModel.create(data)
    res.send({msg:authorData})
}
//!---------------------------------------2nd Q------------------------------------------------------------------------//
//List out the books written by Chetan Bhagat

const listBook = async function (req,res){
    let list= await AuthorModel.find({author_name: req.body.author_name})
    let authorId=list[0].author_id
    let listOfBook = await BookModel.find({author_id :  authorId })
    res.send({msg:listOfBook})
}
//!--------------------------------------3rd Q-----------------------------------------------------------------------------//
//find the author of “Two states” and update the book price to 100; 
//Send back the author_name and updated price in response

const authorTwoStates = async function (req,res){
    let twoStates= await BookModel.find({name : req.body.name})
    let idStates=twoStates[0].author_id
    let idList = await  AuthorModel.find({author_id :  idStates}).select({author_name:1})
    
    let st=twoStates[0].name
    let prizeUpdate= await BookModel.findOneAndUpdate({name : st}, {price:100}, {new:true}).select({price:1})
    res.send({msg : idList, prizeUpdate})
}
//!--------------------------------------4th Q--------------------------------------------------------------------------//
//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books

const prizeBt = async function (req,res){
    let prize= await BookModel.find({price : { $gte:50 ,$lte:100 }}).select({author_id:1})
    let authorId=prize.map(x=>x.author_id)
    let authorNames= await AuthorModel.find({author_id:authorId}).select({author_name:1})
    res.send({msg:authorNames})
}

//!----------------------------------------------------------------------------------------------------------------------//

module.exports={
     createBook,createAuthor,listBook,authorTwoStates,prizeBt
}
// module.exports.createAuthor=
// module.exports.listBook=