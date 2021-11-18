const mongoose=require('mongoose')

const authorSchema=new mongoose.Schema({
    author_name: {
        type : String,
        unique: true
    } ,
    age : Number,
    address: String,
   

}, {timestamps: true} ) 

module.exports = mongoose.model( 'myAuthor',authorSchema )
