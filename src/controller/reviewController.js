const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const userModel = require('../models/userModel')
const booksModel = require('../models/booksModel')
const reviewModel = require('../models/reviewModel')
const { count } = require('../models/userModel')

//-------------------------------Functions---------------------------------/


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidBody = function (requestBody) {
    return Object.keys(requestBody).length == 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

//-----------------------------------------------------------------------------------------//


const createReview = async function (req, res) {
    let params = req.params
    let bookId = params.bookId

    if (!isValidObjectId(bookId)) {
        return res.status(400).send({ status: false, message: `${bookId} is not a valid Book id or not present ` })

    }
    if (!isValid(bookId)) {
        return res.status(400).send({ status: false, message: `${bookId} is not a valid Book id or not present ` })

    }

    let book = await booksModel.findOne({ _id: bookId, isDeleted: false, deletedAt: null })
    if (!book) {
        return res.status(404).send({ status: false, message: `Book not found` })
    }

    let requestBody = req.body
    if (!isValidRequestBody(requestBody)) {
        return res.status(400).send({ status: false, message: "Invalid request parameter, please provide Book Detaills" })

    }
    // Extract Params
    const { reviewedBy, reviewedAt, rating, review } = requestBody

    if (!isValid(reviewedBy)) {
        return res.status(400).send({ status: false, message: "Invalid request parameter, please provide reviewedBy" })
    }

    if (!isValid(rating)) {
        return res.status(400).send({ status: false, message: "Invalid request parameter, please provide rating" })
    }
    if (!(rating >= 1 && rating <= 5)) {
        return res.status(400).send({ status: false, message: "Invalid request parameter, please provide rating between 1 to 5" })
    }
    //-------------------Validation Ends--------------------------------------------//
    let updateReview = {
        bookId: bookId,
        reviewedBy: reviewedBy,
        reviewedAt: Date.now(),
        rating: rating,
        review: review
    }
    let data = await reviewModel.create(updateReview)
    await booksModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: 1 } })

    res.status(201).send({ status: true, data: data })
}

module.exports = {
    createReview
}