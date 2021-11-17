const BookModel=require('../models/bookModel.js')

const createBook= async function(req,res){
    try{
        var data=req.body
    
        let savedData=await BookModel.create(data)
        res.send({msg :savedData})
    }
    catch(error){res.send(error.message)}
    
}

 const bookList= async function(req,res){
     let booksList=await BookModel.find().select({bookName :1 ,authorName:1})
     res.send({msg:booksList})
 }

 const getBooksInYear = async function(req,res){
     let booksInYear=await BookModel.find(  {year:req.body.year}  )
     res.send({msg:booksInYear})
 }

 const getParticularBooks = async function(req,res){
    let particularBooks=await BookModel.find( req.body )
    res.send({msg:particularBooks})
}

const getXINRBooks = async function(req,res){
    let XINRBooks=await BookModel.find({ "prizes.indianPrice" : {$in: ["100 INR", "200 INR", "500 INR"] } }  )
    res.send({msg:XINRBooks})
}

const getRandomBooks = async function(req,res){
    let RandomBooks=await BookModel.find({ $or: [ {stockAvailable: true} , { totalPages: {$gt: 500} }   ] } )
    res.send({msg:RandomBooks})
}


module.exports.createBook=createBook
module.exports.bookList=bookList  
module.exports.getBooksInYear=getBooksInYear 
module.exports.getParticularBooks=getParticularBooks

module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks