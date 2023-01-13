const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, 'email required'],
        unique: [true, "email already exists"]
    },
    mobile: {
        type: String,
        required: [true, 'mobile number required'],
        unique: [true, "mobile number already exists"]
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_960_720.png"
        }
    },
    role: {
        type: String,
        default: "user"
    },
    jobs: {
        type: Array,
        default: []
    }
}, {
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("user", UserSchema)