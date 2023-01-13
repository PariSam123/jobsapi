const { StatusCodes } = require('http-status-codes')
const User = require('../model/User')

const recruiterAuth = async (req,res,next) => {
    try{
        res.json({ user: req.user })
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "err.message" })
    }
}

module.exports = recruiterAuth