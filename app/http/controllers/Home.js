const itemModel=require('../../models/Item')
const homeController=async (req,res)=>{
    const pizzas=await itemModel.find()
    res.render('home',{pizzas:pizzas})
}

const logoutController=async(req,res)=>{
    console.log('in logout home.js line 8')
    req.logout((error)=>{
        res.redirect('/auth/login')
    })
    
}
module.exports={
    homeController,
    logoutController
}