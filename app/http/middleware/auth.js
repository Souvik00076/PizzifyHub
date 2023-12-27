const auth=(req,res,next)=>{

    if(req.isAuthenticated()){
        return next()
    }
    //store everything into session or reddish and go to login page.
    res.redirect('/auth/login')
}
module.exports=auth