
const itemModel=require('../../models/Item')
const insertAll=async (req,res)=>{
    console.log(req.body)
    const item=await itemModel.create(req.body)
    await item.save()
    res.status(201).json({msg:'Job saved'})
}

module.exports={
    insertAll
}