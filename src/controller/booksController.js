const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const userModel = require('../models/userModel')
const booksModel = require('../models/booksModel')


//-------------------------------Functions---------------------------------/


const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
} 
//------------------------------------------------------------------------//

const createBlog = async function (req, res) {

    const requestBody = req.body


    if (!isValidRequestBody(requestBody)) {
        return res.status(400).send({ status: false, message: "Invalid request parameter, please provide author Detaills" })
    }

    let {title,excerpt,userId,ISBN,category,subcategory,reviews,deletedAt,isDeleted,releasedAt} =requestBody

    if (!isValid(title)) {
        return res.status(400).send({ status: false, message: "Invalid request parameter, please provide Title" })
    }
   
    const isTitleAlreadyPresent = await booksModel.findOne({title})

    if(isTitleAlreadyPresent){
        return res.status(400).send({ status: false, message: "Title Already Present" })
    }

    if (!isValid(excerpt)) {
        return res.status(400).send({ status: false, message: "Invalid request parameter, please provide Title" })
    }




}