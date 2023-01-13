const { StatusCodes } = require('http-status-codes')
const User = require('../model/User')

const adminAuth = async (req,res,next) => {
    try{
        //res.json({ adminUser: req.user })

        const adminUser = await User.findById({ _id: req.user._id })
            if(!adminUser)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "user id doesn't exist" })

        if(adminUser.role !== "superadmin")
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Admin Resources, access denied for non-admin users." }) 
        //res.json({ adminUser })
        next()
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "err.message" })
    }
}

module.exports = adminAuth