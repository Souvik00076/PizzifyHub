
const loginAuth=(req,res)=>{
    res.render('auth/login')
}
const registerAuth=(req,res)=>{
    res.render('auth/register')
}

module.exports={
    loginAuth,
    registerAuth
}