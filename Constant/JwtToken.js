const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
    return jwt.sign({ id: payload._id, email: payload.email }, process.env.SECRET_KEY, { expiresIn: '2m' })
}
const generateRefreshToken = (payload) => {
    return jwt.sign({ id: payload._id }, process.env.REFRESH_SECRET_KEY, { expiresIn: '15d' })
}


module.exports = { generateToken, generateRefreshToken }