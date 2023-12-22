const express=require('express')
const homeController = require('../app/http/controllers/Home')
const homeRouter=express.Router()
homeRouter.route('/').get(homeController)
module.exports=homeRouter

