const express=require('express')
const adminRouter=express.Router()
const  {insertAll,fetchOrders,getOrderStatus}=require('../../app/http/controllers/admin/adminController')

adminRouter.route('/insert-pizzas').post(insertAll)
adminRouter.route('/orders').get(fetchOrders)
adminRouter.route('/order/status').post(getOrderStatus)
module.exports=adminRouter