const { StatusCodes } = require("http-status-codes")
const cloudinary = require('cloudinary')
const fs = require('fs');
const User = require("../model/User");
//const { remove } = require("../model/User")

//config settings
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//remove temp files
const removeTemp = (path) => {
    fs.unlinkSync(path)
}

const imageController = {
    uploadProfileImg: async (req, res) => {
        try{
            // res.json({ "data" : req.files })
            //checks incoming req is empty or not
            if(!req.files || Object.keys(req.files).length === 0)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "No files are uploaded" })

            //storing file info
            const file = req.files.myfile;

            //file size
            if(file.size > 1* 1024* 1024){
                removeTemp(file.tempFilePath)
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "File size must be less than 1mb. "})
            }

            //file type
            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg'){
                removeTemp(file.tempFilePath)
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid file type" })
            }

            //upload logic
            await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'jobsapi' }, async (err,result) => {
                if(err) throw err;
                removeTemp(file.tempFilePath)
                res.status(StatusCodes.OK).json({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            })


        }catch (err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    },
    deleteProfileImg: async (req, res) => {
        try{
            const { public_id } = req.body;

            if(!public_id)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "No image id found" })

            await cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if(err)
                    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message })

                res.status(StatusCodes.OK).json({ msg: "Profile image deleted successfully" })
            })
            //res.json("delete image called")
            
        }catch (err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    }
}

module.exports = imageController