const express=require('express')
const authRouter=express.Router()

const {loginAuth,registerAuth}=require('../app/http/controllers/AuthController')


authRouter.route('/login').get(loginAuth)
authRouter.route('/register').get(registerAuth)

module.exports=authRouter