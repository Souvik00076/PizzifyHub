const express=require('express')
const orderRouter=express.Router()

const {placeOrderController,viewOrderController}=require('../../app/http/controllers/customers/OrderController')

orderRouter.route('/orders').post(placeOrderController).get(viewOrderController)
module.exports=orderRouter
