const express=require('express')
const {homeController,logoutController} = require('../app/http/controllers/Home')
const homeRouter=express.Router()
homeRouter.route('/').get(homeController)
homeRouter.route('/logout').post(logoutController)
module.exports=homeRouter

