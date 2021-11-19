const bookModel = require("../models/bookModel.js");
const mongoose = require("mongoose");
const authorModel = require("../models/authorModel.js");
const PublisherModel=require("../models/publisherModel.js")

const createBook = async function (req, res) {
  let bookData = req.body
  let authorId = req.body.author
  let publisherId= req.body.publisher
  let authorFromRequest = await authorModel.findById(authorId)
  let publisherFromRequest= await PublisherModel.findById(publisherId)
  if (authorFromRequest && publisherFromRequest ) {
    let savedBook = await bookModel.create(bookData)
    res.send({ msg: savedBook })
  } else {
    res.send('No such Id')
  }


}

const getBooks = async function (req, res) {
  let allBooks = await bookModel.find().populate('author',{"author_name":1 , "age":1}).populate('publisher')
  res.send({ msg: allBooks });
};





module.exports.createBook = createBook;
module.exports.getBooks = getBooks;


