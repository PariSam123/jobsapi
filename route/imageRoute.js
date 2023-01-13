const route = require('express').Router()
const imageController = require('../controller/imageController')

route.post(`/profile/upload`, imageController.uploadProfileImg)
route.post(`/profile/destroy`, imageController.deleteProfileImg)

module.exports = route