
const jwt = require('jsonwebtoken')

let tokenCheck = function (req, res, next) {
    try {
        let token = req.headers['x-auth-token']
        if (token) {
            let validate = jwt.verify(token, 'radium')
            if (validate) {
                req.validate = validate
                next()
            } else {
                res.status(401).send({ status: false, message: "Invalid Token" })
            }
        } else {
            res.status(401).send({ status: false, message: "Mendatary authontication is Missing" })
        }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}


module.exports.tokenCheck = tokenCheck
