const jwt = require('jsonwebtoken')
const users = require('../models/users.model')

const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header 
            token = req.headers.authorization.split(' ')[1]
            console.log(token);

            // Verify token
            const decoded = jwt.verify(token, process.env.SECRET)

            // Get user from the token
            req.users = await users.findById(decoded.id)

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}

module.exports = { protect }