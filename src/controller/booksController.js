const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const userModel = require('../models/userModel')
const booksModel = require('../models/booksModel')


//-------------------------------Functions---------------------------------/


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

//------------------------------------------------------------------------//

const createBook = async function (req, res) {
    try {
        const requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide Book Detaills" })
        }

        let { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt } = requestBody

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide Title" })
        }

        const isTitleAlreadyPresent = await booksModel.findOne({ title })

        if (isTitleAlreadyPresent) {
            return res.status(400).send({ status: false, message: "Title Already Present" })
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide Title" })
        }

        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide userId" })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(400).send({ status: false, message: `User does not exit` })
        }
        if (!isValidObjectId(userId)) {             //!-------Ask Mentor------------//
            return res.status(400).send({ status: false, message: "userId provided is not valid" })
        }
        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide ISBN" })
        }
        const IsbnAlreadyPresent = await booksModel.findOne({ ISBN: requestBody.ISBN })
        if (IsbnAlreadyPresent) {
            return res.status(400).send({ status: false, message: "ISBN is already present" })
        }
        if (!isValid(category)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide category" })
        }
        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide subcategory" })
        }
        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide date" })
        }
        if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(releasedAt)) {

            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide valid release date" })
        }
        //------------------------------------Validation Ends-------------------------------------------------------------//

        const updatedBody = { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt }
        let bookData = await booksModel.create(updatedBody)
        return res.status(201).send({ status: true, message: 'Success', data: bookData })
        // const filterQuery = {isDeleted: false, deletedAt: null, isPublished: true}
        //         const queryParams = req.query
        // if(isValidRequestBody(queryParams)) {
        //     const {authorId, category, tags, subcategory} = queryParams

        //     if(isValid(authorId) && isValidObjectId(authorId)) {
        //         filterQuery['authorId'] = authorId
        //     }


    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}

const getBooks = async function (req, res) {  //!----- testing ----
    try {
        let queryParams = req.query;
        const obj = { isDeleted: false, deletedAt: null }

        if (isValidRequestBody(queryParams)) {
            const { userId, category, subcategory } = queryParams

            if (isValid(userId) && isValidObjectId(userId)) {
                obj['userId'] = userId;
            }
            if (isValid(category)) {
                obj['category'] = category;
            }
            if (isValid(subcategory)) {
                obj['subcategory'] = subcategory;
            }
        }

        let book = await booksModel.find(obj).select({_id:1,title:1 ,excerpt:1,userId:1,category:1,reviews:1,releasedAt:1})
        if (!book) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, No such book present" })
        }

        let sortedByTitle= book.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)   //!---Ask Mentor---
    
    
        res.status(200).send({ status: true, data: sortedByTitle})
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}

const updateBooks = async function (req, res) {    

    try{
        let requestBody = req.body;
        let bookId = req.params.bookId;
        let userIdT = req.userId;

        if (isValid(bookId)) {
            return res.status(400).send({ status: false, msg: " enter valid book id" });
        }

        if (isValid(userIdT)) {
            return res.status(400).send({ status: false, message: `${userIdT}  not  valid token id` });
        }

        const book = await bookModel.findOne({ isDeleted: false, _id: bookId, deletedAt: null });

        if (!book) {
            return res.status(404).send({ status: false, message: `Book not found` });
        }

        if (book.userId.toString() !== userId) {
            return res.status(401).send({ status: false, message: `Unauthorized access ` });

        }

        if (isValid(requestBody)) {
            return res.status(200).send({ status: true, message: "No paramateres passed ", data: book });
        }

        let { title, excerpt, releasedAt, ISBN } = requestBody;

        let updateBook = {};

        if (isValid(title)) {
            if (!(updateBook, "$set")) updateBook["$set"] = {};

            updateBook["$set"]["title"] = title;

            let isTitleAlreadyPresent = await bookModel.aggregate([{ $match: { title: title } }]);

            if (isTitleAlreadyPresent > 1) {
                return res.status(400).send({ status: false, message: `${title} is already present` });
            }
        }

        if (isValid(excerpt)) {
            if (!(updateBook, "$set")) updateBook["$set"] = {};

            updateBook["$set"]["excerpt"] = excerpt;
        }

        if (isValid(ISBN)) {
            if (!(updateBook, "$set")) updateBook["$set"] = {};

            updateBook["$set"]["ISBN"] = ISBN;

            let isIsbnAlreadyPresent = await bookModel.aggregate([
                { $match: { ISBN: ISBN } },
            ]);

            if (isIsbnAlreadyPresent > 1) {
                return res.status(400).send({ status: false, message: `${ISBN} is already present` });
            }
        }

        if (isValid(releasedAt)) {
            if (!validateDate(releasedAt)) {
                return res.status(400).send({ status: false, message: "Invalid Released Date " });
            }

            if (!(updateBook, "$set")) updateBook["$set"] = {};

            updateBook["$set"]["releasedAt"] = releasedAt;
        }
        
        const updatedBook = await bookModel.findOneAndUpdate({ _id: bookId }, updateBook, { new: true });

        res.status(200).send({ status: true, message: "book updated successfully", data: updatedBook });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

module.exports = {
    createBook, getBooks,updateBooks
}