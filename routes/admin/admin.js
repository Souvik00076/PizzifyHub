const express=require('express')
const adminRouter=express.Router()
const  {insertAll,fetchOrders}=require('../../app/http/controllers/admin/adminController')

adminRouter.route('/insert-pizzas').post(insertAll)
adminRouter.route('/orders').get(fetchOrders)
module.exports=adminRouter