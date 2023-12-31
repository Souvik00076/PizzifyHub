const OrderModel = require('../../../models/Order')
const Order=require('../../../models/Order')
const moment=require('moment')
const placeOrderController=async (req,res)=>{

    const {phoneNumber,address}=req.body
    if(!phoneNumber || !address){
        req.flash('error','All fields are required')
        return res.redirect('/customers/cart')
    }
    const temp={
        customerId:req.user._id,
        items:req.session.cart.items,
        phone:phoneNumber,
        address:address
    }
    const order=await Order.create(temp)
    const orders=await orderItems(req,res)
    delete req.session.cart
    const eventEmitter=req.app.get('eventEmitter')
    eventEmitter.emit('orderPlaced',{order:order})
    req.flash('success','Orders placed successfully!!')
    res.render('customers/order',{orders:orders,moment:moment})
}
const viewOrderController=async (req,res)=>{
    const orders=await orderItems(req,res)
    res.render('customers/order',{orders:orders,moment:moment})
}

const orderItems=async(req,res)=>{
    const items=await Order.find({customerId:req.user._id}).sort({createdAt:-1}).exec()
    return items
}

const getSingleOrderController=async (req,res)=>{
    const orderId=req.params.id
    const order=await OrderModel.findById(orderId)
    res.render('customers/SingleOrder',{order:order})
}
module.exports={
    placeOrderController,
    viewOrderController,
    getSingleOrderController
}