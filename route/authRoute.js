const route = require('express').Router()
const authController = require('../controller/authController')
const adminAuth = require('../middleware/adminAuth')
const auth = require('../middleware/auth')

//to register new user
route.post(`/register`, authController.register)

//to login
route.post(`/login`, authController.login)

//to logout 
route.get(`/logout`, authController.logout)

//to generate login session token
route.get(`/refresh_token`, authController.userAccessToken)

//logged user info
route.get(`/userinfo`,auth, authController.getUserInfo)

//to read all registered users list
route.get(`/allusers`, auth, adminAuth, authController.getAllUsers)

//to change role
route.patch(`/user/role/:id`, auth, adminAuth, authController.changeRole)

//to update user
route.patch(`/user/update/:id`, auth, authController.updateUser )

//to delete user
route.delete(`/user/delete/:id`, auth, adminAuth, authController.deleteUser)

module.exports = route