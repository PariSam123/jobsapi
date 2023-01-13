const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const auth = async ( req,res, next) => {
    try{
        const token = req.header('Authorization')

        //res.json({ token })
        jwt.verify(token, process.env.SECRET_TOKEN, (err,user) => {
            if(err)
                return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid Authorization." })

            //res.json({ user })

            req.user = user
            next() //continue execution to next controller
        })
    }
    catch (err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
}
module.exports = auth;
