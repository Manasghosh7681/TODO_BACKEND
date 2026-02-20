const jwt = require('jsonwebtoken')
const { errorResponse } = require("../Constant/Constant")

const requiredData = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: 'Missing Request body'
        })
    }
    const { password } = req.body
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/
    if (!password.match(regex)) {
        return res.status(409).json({
            success: false,
            message: 'password must contain uppercase,lowercase,number,symbol and length should be 6 digit'
        })
    }
    next()
}
const AuthValid = (req, res, next) => {
   try{
     const header = req.headers.authorization
    if (!header) {
        return errorResponse(res, 403, 'Authorization header missing')
    }
    const token = header.split(' ')[1]
    const isValid = jwt.verify(token, process.env.SECRET_KEY)
   
    next()
   }catch(err){
    console.log(err.message)
    return errorResponse(res,401,'Invalid token')
   }
}
const IdRequired=(req,res,next)=>{
try{
    if(!req.body){
        return errorResponse(res,400,"Missing body")
    }
    const {id}=req.body
    if(!id){
        return errorResponse(res,400,"Id required")
    }
    next()

}catch(err){
    console.log(err.message)
   return errorResponse(res,400,"Missing body")
}
}

module.exports = { requiredData, AuthValid ,IdRequired}