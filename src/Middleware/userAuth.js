const jwt = require('jsonwebtoken')
const booksModel = require('../models/booksModel')

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        if (!token) {
            res.status(403).send({ status: false, message: `Missing authentication token in request` })
            return;
        }
    
        let decoded = await jwt.decode(token)
        
        if (Date.now() > (decoded.exp)*1000 ){
            return res.status(404).send({ status: false, message: `Token Expired, please login again` })
        }
        const verify = await jwt.verify(token, 'project4')
        
        if (!verify) {
            res.status(403).send({ status: false, message: `Invalid authentication token in request` })
            return;
        }
        
        req.userId = decoded.userId
       
        next()
    } catch (error) {
        console.error(`Error! ${error.message}`)
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {
    userAuth
}