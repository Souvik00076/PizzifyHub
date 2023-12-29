const express=require('express')
const orderRouter=express.Router()

const {placeOrderController,viewOrderController,getSingleOrderController}=require('../../app/http/controllers/customers/OrderController')

orderRouter.route('/orders').post(placeOrderController).get(viewOrderController)
orderRouter.route('/orders/:id').get(getSingleOrderController)
module.exports=orderRouter
