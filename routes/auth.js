const express=require('express')
const authRouter=express.Router()

const {loginAuth,registerAuth,postRegisterAuth,authenticatePostLogin}=require('../app/http/controllers/AuthController')


authRouter.route('/login').get(loginAuth).post(authenticatePostLogin)
authRouter.route('/register').get(registerAuth).post(postRegisterAuth)
module.exports=authRouter