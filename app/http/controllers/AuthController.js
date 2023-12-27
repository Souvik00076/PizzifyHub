const User=require('../../models/User')
const passport=require('passport')
const loginAuth=(req,res)=>{
    res.render('auth/login')
}
const registerAuth=(req,res)=>{
    res.render('auth/register')
}
const postRegisterAuth=async (req,res)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password){
        req.flash('error','Fields cannot be empty')
        req.flash('name',username)
        req.flash('email',email)
        return res.redirect('/auth/register')
    }
    User.exists({email:email}).then((err,result)=>{
            if(result){
                req.flash('error','Account already exist')
                req.flash('name', username)
                req.flash('email',email)
                return res.redirect('/auth/register')
            }
            
    })
    const temp={name:username,email,password}
    const user=await User.create(temp)   
    req.flash('success','Welcome !! Good to see you.')
    res.redirect('/')
}
const authenticatePostLogin=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            req.flash('error',info.message)
            return next(err)
        }
        if(!user){
            req.flash('error',info.message)
            return res.redirect('/auth/login')
        }
        req.login(user,(err)=>{
            req.flash('success',info.message)
            return res.redirect('/')    
        })
        
    })(req,res,next)
}
module.exports={
    loginAuth,
    registerAuth,
    postRegisterAuth,
    authenticatePostLogin
}