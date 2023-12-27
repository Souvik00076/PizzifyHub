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
   // delete req.session.cart
    req.flash('success','Orders placed successfully!!')
    res.render('customers/order',{orders:orders,moment:moment})
}
const viewOrderController=(req,res)=>{
    console.log("in viewOrderController")
    res.render('customers/order')
}

const orderItems=async(req,res)=>{
    const items=await Order.find({customerId:req.user._id}).sort({createdAt:-1}).exec()
    return items
}
module.exports={
    placeOrderController,
    viewOrderController
}