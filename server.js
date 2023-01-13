require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { StatusCodes } = require("http-status-codes")
const connectDb = require('./db/connect')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT

//ref
const app = express();

//body parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//middleware
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(cookieParser(process.env.SECRET_TOKEN)) //pass token only for signed cookies

//api route
app.use(`/api/v1/auth`, require('./route/authRoute'))
app.use(`/api/v1/image`, require('./route/imageRoute'))
app.use(`/api/v1/job`, require('./route/jobRoute'))

//default route
app.all('*', async (req,res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `requested path not found. `})
})

//server
app.listen(PORT, async () => {
     await connectDb()
    console.log(`server is started @ http://localhost:${PORT}`)
})