const express=require('express')
const cartRouter=express.Router()
const {cartController,updateCart}=require('../../app/http/controllers/customers/CartController')
cartRouter.route('/').get(cartController)
cartRouter.route('/update-cart').post(updateCart)
module.exports=cartRouter