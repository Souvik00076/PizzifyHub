const adminMiddleware=(req,res)=>{
    if(req.isAuthenticated() && req.user.role=='admin'){
        return next()
    }
    res.redirect('/')
}
module.exports=adminMiddleware
//this part is not working check later why?