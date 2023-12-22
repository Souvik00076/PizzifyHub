const mongoose=require('mongoose')

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name cannot be empty']
    },
    image:{
        type:String,
        required:[true,'image cannot be empty']
    },
    price:{
        type:Number,
        required:[true,'price cannot be empty']
    },
    size:{
        type:String,
        required:[true,'price cannot be empty']
    }
})

const itemModel=mongoose.model('Menu',itemSchema)
module.exports=itemModel