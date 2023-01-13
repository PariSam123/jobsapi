const jwt = require('jsonwebtoken')

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '1d' })
}

module.exports = { createAccessToken }