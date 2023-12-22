const itemModel=require('../../models/Item')
const homeController=async (req,res)=>{
    const pizzas=await itemModel.find()
    res.render('home',{pizzas:pizzas})
}


module.exports=homeController