const express=require('express')
const adminRouter=express.Router()
const  {insertAll}=require('../app/http/controllers/adminController')

adminRouter.route('/').post(insertAll)
module.exports=adminRouter