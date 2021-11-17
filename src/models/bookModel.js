const mongoose=require("mongoose")

const bookSchema= new mongoose.Schema({
    bookName :{
         type: String,
         required : "User BookName is Required",
         unique : true
    } ,
    prizes:{
        indianPrice : String,
        europeanPrice: String
    },
    year : {
        type:Number,
        default :2021
    },
    tags : [String],
    authorName : String,
    totalPages :{
        type : Number,
        unique : true
    } ,
    stockAvailable : Boolean,
}, {timestamps: true})

module.exports=mongoose.model('BooksCollection',bookSchema ) //books      