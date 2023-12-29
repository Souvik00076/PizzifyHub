const itemModel=require('../../../models/Item')
const orderModel=require('../../../models/Order')
const userModel=require('../../../models/User')
const insertAll=async (req,res)=>{
    console.log(req.body)
    const item=await itemModel.create(req.body)
    await item.save()
    res.status(201).json({msg:'Job saved'})
}
const fetchOrders=async (req,res)=>{
    const orders=await orderModel
                    .find({status:{$ne:"completed"}})
                    .sort({createdAt:-1})
                    .populate({
                        path:'customerId',
                        model:userModel,
                        select:'-password'
                    })
                    
    if(req.xhr) return res.json(orders)
    return res.render('admin/orders')
}

const getOrderStatus=async (req,res)=>{
    const {orderId,status}=req.body
   
    const order=await orderModel.updateOne({_id:orderId},{status:status});
    //emit event
    const eventEmitter=req.app.get('eventEmitter')
    eventEmitter.emit('orderUpdated',{orderId:orderId,status:status})
    res.redirect('/admin/orders')
}

module.exports={
    insertAll,
    fetchOrders,
    getOrderStatus
}