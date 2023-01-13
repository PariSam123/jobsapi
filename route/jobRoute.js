const route = require('express').Router()
const jobController = require('../controller/jobsController')

route.get(`/`, jobController.getAll) // read all
route.get(`/:id`, jobController.getSingle) //read single

route.post(`/`, jobController.create) //create

route.patch(`/:id`, jobController.update) //update
//put = update all (have to send all elements)
//patch = can be updated only one also

route.delete(`/:id`, jobController.delete) // delete

module.exports = route