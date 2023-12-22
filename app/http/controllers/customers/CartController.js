const cartController=(req,res)=>{
    res.render('customers/cart')
}
const updateCart=(req,res)=>{

    if(!req.session.cart){
        req.session.cart={
            items:{},
            totalQty:0,
            totalPrice:0
        }
    }
    
    let cart=req.session.cart
    if(!cart.items[req.body._id]){
        cart.items[req.body._id]={
            item:req.body,
            qty:0
        }
    }
    cart.items[req.body._id].qty+=1
    cart.totalQty+=1
    cart.totalPrice+=req.body.price
    res.json({totalQty:cart.totalQty})
}
module.exports={
    cartController,
    updateCart
}